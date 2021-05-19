import numpy as np
def LinearRegression(xl, yl):
    poly = np.polyfit(xl, yl, 1)
    coefficient = {}
    coefficient["a_1"] = poly[0]
    coefficient["a_0"] = poly[1]
    x = np.linspace(0,max(xl))
    calculatedX = []
    calculatedY = []
    for i in x:
        calculatedX.append(i)
        calculatedY.append(np.polyval(poly,i))
    return {'calculatedX': calculatedX, 'calculatedY': calculatedY, 'coefficient': coefficient, }

def PolyRegression3rdOrder(xl, yl, degree):
    poly = np.polyfit(xl, yl, degree) # 2nd degree
    coefficient = {}
    i = 0
    deg = len(poly)-1 # len(poly) = 3 (3rd order)
    while (deg >= 0):
        key = "a_" + str(deg)
        coefficient[key] = poly[i]
        i += 1
        deg -= 1
    x = np.linspace(0,max(xl))
    calculatedX = []
    calculatedY = []
    for i in x:
        calculatedX.append(i)
        calculatedY.append(np.polyval(poly,i))
    return {'calculatedX': calculatedX, 'calculatedY': calculatedY, 'coefficient': coefficient, }

def getFittingEquation(method, option = None, order = None, plotArray=[]):
    equation = None
    formula = None
    result = None
    if len(plotArray['arrayX']) > 0:
        if method == "Linear Regression":
            result = LinearRegression(plotArray['arrayX'], plotArray['arrayY'])
            formula = 'y=a_1x+a_0'
            equation = 'y={0}x+({1})'.format(result['coefficient']['a_1'],result['coefficient']['a_0'])
        elif method == "Nonlinear Equation" and option:
            if option == "y=bx^m":
                equation = 'ln(y)=mln(x)+ln(b)'
            elif option == "y=be^{mx}":
                equation = 'ln(y)=mx+ln(b)'
            elif option == "y=b10^{mx}":
                equation = 'log(y)=mx+log(b)'
            elif option == "y=\\frac{1}{mx+b}":
                equation = '\\frac{1}{y}=mx+b'
            elif option == "y=\\frac{mx}{b+x}":
                equation = '\\frac{1}{y}=\\frac{b}{mx}+\\frac{1}{m}'
        elif method == "Polynomial Regression" and order:
            if "3rd-Order" in order:
                result = PolyRegression3rdOrder(plotArray['arrayX'], plotArray['arrayY'], 2)
                formula = 'y=a_0+a_1x+a_2x^2'
                equation = 'y=({:.2f})+({:.2f})x+({:.2f})x^2'.format(result['coefficient']['a_0'],result['coefficient']['a_1'],result['coefficient']['a_2'])
            elif "4th-Order" in order:
                result = PolyRegression3rdOrder(plotArray['arrayX'], plotArray['arrayY'], 3)
                formula = 'y=a_0+a_1x+a_2x^2+a_3x^3'
                equation = 'y=({:.2f})+({:.2f})x+({:.2f})x^2+({:.2f})x^3'.format(result['coefficient']['a_0'],result['coefficient']['a_1'],result['coefficient']['a_2'],result['coefficient']['a_3'])
            elif "5th-Order" in order:
                result = PolyRegression3rdOrder(plotArray['arrayX'], plotArray['arrayY'], 4)
                formula = 'y=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4'
                equation = 'y=({:.2f})+({:.2f})x+({:.2f})x^2+({:.2f})x^3+({:.2f})x^4'.format(result['coefficient']['a_0'],result['coefficient']['a_1'],result['coefficient']['a_2'],result['coefficient']['a_3'],result['coefficient']['a_4'])
        elif method == "Interpolation Using Polynomial" and order and option:
            if "3rd-Order" in order:
                formula = 'y=a_0+a_1x+a_2x^2'
                equation = 'y=a_0+a_1x+a_2x^2'
            elif "4th-Order" in order:
                formula = 'y=a_0+a_1x+a_2x^2+a_3x^3'
                equation = 'y=a_0+a_1x+a_2x^2+a_3x^3'
            elif "5th-Order" in order:
                formula = 'y=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4'
                equation = 'y=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4'
        elif method == "Spline Interpolation" and option:
            formula = 'f_i(x) = a_ix^2+b_ix+c_i'
            equation = 'f_i(x) = a_ix^2+b_ix+c_i'
    return {'equation': equation,
            'formula': formula,
            'calculatedX': result['calculatedX'],
            'calculatedY': result['calculatedY']
            }
