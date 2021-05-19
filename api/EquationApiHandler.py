from flask import request
from flask_restful import Api, Resource, reqparse
from api.numericalMethod import *

class EquationApiHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'fittingMethod': {
                "Linear Regression": {
                    'option': [],
                    'order': []
                },
                "Nonlinear Equation": {
                    'option': [
                        'y=bx^m',
                        'y=be^{mx}',
                        'y=b10^{mx}',
                        'y=\\frac{1}{mx+b}',
                        'y=\\frac{mx}{b+x}'
                    ],
                    'order': []
                },
                "Polynomial Regression": {
                    'option': [],
                    'order': [
                        '3rd-Order (2nd Degree)',
                        '4th-Order (3rd Degree)',
                        '5th-Order (4th Degree)',
                    ]
                },
                "Interpolation Using Polynomial": {
                    'option': [
                        'Lagrange Form',
                        'Newton Form',
                    ],
                    'order': [
                        '2nd-Order (1st Degree)',
                        '3nd-Order (2st Degree)',
                        '4nd-Order (3st Degree)',
                    ]
                },
                "Spline Interpolation": {
                    'option': [
                        'Linear',
                        'Quadratic',
                        'Cubic',
                    ],
                    'order': []
                }
            }
        }

    def post(self):
        req = request.get_json(force=True)
        userMethod = req['userMethod']
        plotArray = req['plotArray']
        if userMethod:
            message = "{}||{}".format(userMethod, plotArray)
        else:
            message = "No Message"

        response = {
            "status": "Success",
            "message": message,
            "math": getFittingEquation(userMethod['method'], userMethod['option'], userMethod['order'], plotArray),
        }

        return response
