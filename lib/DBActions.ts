import sqlite3 from 'sqlite3';

export class DBActions {
  private db: sqlite3.Database;

  constructor() {
    // In-memory DB for demo
    this.db = new sqlite3.Database(':memory:');
  }

  async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`CREATE TABLE demo (id INT, name TEXT)`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async insertRow(id: number, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO demo (id, name) VALUES (?, ?)`, [id, name], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async queryRow(): Promise<{ id: number, name: string }> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT id, name FROM demo LIMIT 1`, (err, row) => {
        if (err) reject(err);
        else if (!row) reject(new Error('No rows found'));
        else resolve(row as { id: number, name: string });
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
