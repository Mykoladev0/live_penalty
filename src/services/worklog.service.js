module.exports = class WorklogService {
    constructor(app) {
        this.app = app;
    }

    getWorklogs({ user, from, to }) {
        return this.app.db.sequelize.query(`
            WITH logs AS (
                SELECT *
                FROM worklogs as w
                WHERE user_id = ${user.id}
                ${from && to ? `
                    AND date >= '${from}'
                    AND date <= '${to}'
                ` : ''}
            )

            SELECT *, (
                SELECT SUM(hours_worked) as total_hours
                FROM logs as lg
                WHERE date = logs.date
            )
            FROM logs
        `, { type: this.app.db.sequelize.QueryTypes.SELECT});
    }

    async generateWorklogsExport({ user, from, to }) {
        const worklogs = await this.app.db.sequelize.query(`
            SELECT date, SUM(hours_worked) as total_hours, array_agg(notes) as notes
            FROM worklogs as w
            WHERE user_id = ${user.id}
            AND date >= '${from}'
            AND date <= '${to}'
            GROUP BY date
            ORDER BY date DESC
        `, { type: this.app.db.sequelize.QueryTypes.SELECT});

        return this.generateHtml(worklogs);
    }

    generateHtml(worklogs) {
        return `<html>
            <body>
                <div class="worklogs">
                    ${worklogs.map(worklog => {
                        return `<ul class="worklog">
                            <li>Date: ${worklog.date.split('-').join('.')}</li>
                            <li>Total time: ${worklog.total_hours}h</li>
                            <li>Notes:
                                <ul>
                                    ${worklog.notes.map(note => {
                                        return `<li>${note}</li>`;
                                    }).join('\n')}
                                </ul>
                            </li>
                        </ul>`;
                    }).join('\n')}
                </div>
            </body>
        </html>`;
    }
}
