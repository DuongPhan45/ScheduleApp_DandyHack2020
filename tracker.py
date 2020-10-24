from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
application = app
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'

bootstrap = Bootstrap(app)
moment = Moment(app)
db = SQLAlchemy(app)


class HabitForm(FlaskForm):
    habit = StringField('Habit', validators=[DataRequired()])
    CHOICES = [1,2,3,4,5,6,7]
    frequency = SelectField('Frequency', validators=[DataRequired()], choices=CHOICES,)
    submit = SubmitField('Add Habit')

class Habit(db.Model):
    habit = db.Column(db.String(100), primary_key=True)
    frequency = db.Column(db.Integer, nullable=False)
    done = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.DateTime, default = datetime.utcnow)

    # def __ref__(self):
    #     return '<Habit %r, total %r, done %r>' %self.habit, %self.frequency, %self.done


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Habit = Habit)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


@app.route('/', methods=['GET', 'POST'])
def index():
    form = HabitForm()
    if request.method=="POST":

        habit = form.habit.data
        frequency = form.frequency.data
        newHabit = Habit(habit=habit, frequency=frequency, done=0)

        db.session.add(newHabit)
        db.session.commit()

    habitList = Habit.query.order_by(Habit.date_created).all()
    form.habit.data = ''
    
    return render_template('index.html', form=form, habitList=habitList)
