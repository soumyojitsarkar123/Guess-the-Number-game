num1 = float(input("Enter 1st Number : "))
operator = input("Enter an Operator ( + - * / ) : ")
num2 = float(input("Enter 2nd Number : "))
if operator == '+':
    print(num1 + num2)
elif operator == '-':
    print(num1 - num2) 
elif operator == '*':
    print(num1 * num2)
elif operator == '/':
    print(num1 / num2)
else:
    print("Invalid Operator")