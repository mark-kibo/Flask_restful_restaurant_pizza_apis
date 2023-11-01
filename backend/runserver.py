
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_restx import  Api
from flask import jsonify
from flask_restx import Namespace, Resource





app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurant.db'
db = SQLAlchemy(app)
api=Api(app)
ma = Marshmallow(app)

# configurations
CORS(app) 



pizzanamespace=Namespace("pizza", "api for pizzas")

restaurantpizzanamespace=Namespace("restaurantpizza", "api for restaurantpizza")

restaurantnamespace=Namespace("restaurant", "api for restaurants")

# this is the api blueprint initialization for swagger
api.add_namespace(pizzanamespace, "/pizzas")
api.add_namespace(restaurantnamespace, "/restaurants")
api.add_namespace(restaurantpizzanamespace, "/restaurantpizza")


# models
class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    pizzas = db.relationship('Pizza', secondary='restaurant_pizza', back_populates='restaurants')

class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    restaurants = db.relationship('Restaurant', secondary='restaurant_pizza', back_populates='pizzas')

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)


class RestaurantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Restaurant

class PizzaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pizza

# Data initialization function
def initialize_data():
    with app.app_context():
        # Check if the data already exists
        if not Restaurant.query.first():
            # Create sample data for testing
            restaurant1 = Restaurant(name='Restaurant 1', address='Address 1')
            restaurant2 = Restaurant(name='Restaurant 2', address='Address 2')
            db.session.add(restaurant1)
            db.session.add(restaurant2)
        
        if not Pizza.query.first():
            # Create sample pizza data for testing
            pizza1 = Pizza(name='Pizza 1', ingredients='Ingredient 1')
            pizza2 = Pizza(name='Pizza 2', ingredients='Ingredient 2')
            db.session.add(pizza1)
            db.session.add(pizza2)
        
        db.session.commit()
# ----------------------------------------------

# apis part
@pizzanamespace.route("/")
class GetPizzas(Resource):
    def get(self):
        """
        get all pizzas
        """
        pizzas = Pizza.query.all()
        pizza_schema = PizzaSchema(many=True)
        result = pizza_schema.dump(pizzas)
        return jsonify(result)



@restaurantpizzanamespace.route("/")
class CreateRestaurantPizza(Resource):
    def post(self):
        # request data from user
        data = request.get_json()
        price = data.get('price')
        pizza_id = data.get('pizza_id')
        restaurant_id = data.get('restaurant_id')

        if not (price and pizza_id and restaurant_id):
            return jsonify({'errors': ['Validation errors']}), 400

        pizza = Pizza.query.get(pizza_id)
        restaurant = Restaurant.query.get(restaurant_id)


        if not pizza and restaurant or not price <= 30 and price >= 1 :
            return jsonify({
                "errors":["validation errors"]
            }), 400
        
        respizza=RestaurantPizza(price=price, pizza=pizza, restaurant=restaurant)
        db.session.add(respizza)
        db.session.commit()


        response=PizzaSchema().dump(pizza)
        return jsonify(response), 201
    

        



@restaurantnamespace.route("/")
class GetRestaurants(Resource):
    def get(self):
        """
        get all listed restaurants
        
        """
        
        restaurants = Restaurant.query.all()
        restaurant_schema = RestaurantSchema(many=True)
        response = restaurant_schema.dump(restaurants)
        return jsonify(response)

@restaurantnamespace.route("/restaurant/<int:id>/")
class GetRestaurantOrDelete(Resource):
    def get(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant:
            restaurant_schema = RestaurantSchema()
            response = restaurant_schema.dump(restaurant)
            return jsonify(response)
        else:
            return jsonify({'error': 'Restaurant not found'}), 404
    
    def delete(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return '', 204
        else:
            return jsonify({'error': 'Restaurant not found'}), 404

      



if __name__ == "__main__":
    with app.app_context():
        initialize_data()
    app.run(debug=True)