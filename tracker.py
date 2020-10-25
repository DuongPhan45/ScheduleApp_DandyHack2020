from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, IntegerField
from wtforms.validators import DataRequired, NumberRange
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import json


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
    frequency = SelectField('Frequency (For adding habit only)', validators=[DataRequired()], choices=CHOICES)
    done = IntegerField('Enter number of done', validators=[NumberRange(min=0, max=frequency, message="You entered a number out of range")])
    submit = SubmitField('Add/Update Habit')
    delete = SubmitField("Delete Habit")

class Habit(db.Model):
    habit = db.Column(db.String(100), primary_key=True)
    frequency = db.Column(db.Integer, nullable=False)
    done = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.DateTime, default = datetime.utcnow)

    def turnToDict(self):
        return {
            "habit": self.habit,
            "frequency":self.frequency,
            "done": self.done,
            "date_created": self.date_created
            }

        

@app.route('/', methods=['GET', 'POST'])
def index():
    form = HabitForm()

    if request.method=="POST":
        # Add/update
        habit = form.habit.data
        frequency = form.frequency.data
        done = form.done.data
        
        if form.submit.data: # Add or update
            # Check if the habit is already in the db
            found_habit = Habit.query.filter_by(habit=habit).first()
            if found_habit is None:
                newHabit = Habit(habit=habit, frequency=frequency, done=done)
                db.session.add(newHabit)
            else:
                found_habit.done= done
        else: # Delete
            found_dhabit = Habit.query.filter_by(habit=habit).all()
            for h in found_dhabit:
                db.session.delete(h)
                  
        db.session.commit()

    habitList = Habit.query.order_by(Habit.date_created).all()
    print(habitList)

    # Turn the object list to dictionary list
    habitjson = []
    for habit in habitList:
        habitjson.append(habit.turnToDict())
    
    # Clear the form fields
    form.habit.data = ''
    
    return render_template('index.html', form=form, habitList=habitjson)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Habit = Habit)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500



