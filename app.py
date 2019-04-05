from flask import Flask, render_template, make_response
from database import retrieve_table
import csv
import io
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)

db = SQLAlchemy(app)

# Connects to HTML pages

@app.route("/")
def home_page():
    return render_template('home.html')


@app.route("/coverage")
def coverage_page():
    return render_template('coverage.html')


@app.route("/disagrees")
def disagrees_page():
    return render_template('disagrees.html')

@app.route("/deaths")
def deaths_page():
    return render_template('deaths.html')


# REST endpoints - Connects to Database

@app.route("/table/<table_name>")
def table(table_name):
    """
    NOT SURE IF NECESSARY
    Return a database table as CSV.
    https://stackoverflow.com/a/26998089/240490
    """
    data = retrieve_table(table_name)
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerows(data)
    output = make_response(si.getvalue())
    output.headers["Content-type"] = "text/csv"
    return output

    # could also try jsonify(data)
