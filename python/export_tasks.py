import csv
import os
import sys
from datetime import datetime

import psycopg2
from dotenv import load_dotenv

load_dotenv(dotenv_path='../backend/.env')

def export_tasks(output_file='tasks_export.csv'):
    try:
        conn = psycopg2.connect(
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432'),
            database=os.getenv('DB_NAME'),
        )
    except Exception as e:
        print(f'Ошибка подключения к БД: {e}', file=sys.stderr)
        sys.exit(1)

    try:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT id, title, description, status, created_at FROM tasks ORDER BY id'
            )
            rows = cur.fetchall()

        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['id', 'title', 'description', 'status', 'created_at'])
            writer.writerows(rows)

        print(f'Экспортировано {len(rows)} задач в {output_file}')
    except Exception as e:
        print(f'Ошибка экспорта: {e}', file=sys.stderr)
    finally:
        conn.close()


if __name__ == '__main__':
    export_tasks()