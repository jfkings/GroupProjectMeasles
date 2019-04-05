import sqlite3
import csv

DATABASE_PATH = 'project.db'


def retrieve_table(table_name):
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute(f'SELECT * FROM {table_name}')
    headers = tuple(d[0] for d in c.description)
    rows = c.fetchall()
    return [headers] + rows


def create_tables():

    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()

    c.execute('''
        CREATE TABLE deaths (
           Entity text,
           Code text,
           Year integer,
           Measles_Number real
        )
    ''')
    conn.commit()

    c.execute('''
        CREATE TABLE coverage (
            Entity text,
            Code text,
            Year integer,
            Vaccine_Pct real,
            Measles_per_1M real,
            Total_Pop real
        )
    ''')
    conn.commit()

    c.execute('''
        CREATE TABLE children (
            Entity text,
            Code text,
            Year integer,
            Immunization_Pct real
        )
    ''')
    conn.commit()

    c.execute('''
        CREATE TABLE disagrees (
            Entity text,
            Code text,
            Year integer,
            Pct real
        )
    ''')
    conn.commit()


def load_csv_data(filepath):
    with open(filepath) as f:
        cr = csv.reader(f)
        data = [row for row in cr]
    return data


def load_tables():

    create_tables()

    conn = sqlite3.connect(DATABASE_PATH)

    deaths = load_csv_data('data/deaths.csv')
    c = conn.cursor()
    for d in deaths[1:]:
        c.execute('INSERT INTO deaths VALUES (?,?,?,?)', d)
    conn.commit()

    coverage = load_csv_data('data/coverage.csv')
    c = conn.cursor()
    for d in coverage[1:]:
        c.execute('INSERT INTO coverage VALUES (?,?,?,?,?,?)', d)
    conn.commit()

    children = load_csv_data('data/children.csv')
    c = conn.cursor()
    for d in children[1:]:
        c.execute('INSERT INTO children VALUES (?,?,?,?)', d)
    conn.commit()

    disagrees = load_csv_data('data/disagrees.csv')
    c = conn.cursor()
    for d in disagrees[1:]:
        c.execute('INSERT INTO disagrees VALUES (?,?,?,?)', d)
    conn.commit()