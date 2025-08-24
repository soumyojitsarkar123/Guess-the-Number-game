#include <stdio.h>

int main() {
    int num1, num2, sum;
    
    // Input two digits
    printf("Enter first digit: ");
    scanf("%d", &num1);
    
    printf("Enter second digit: ");
    scanf("%d", &num2);
    
    // Calculate sum
    sum = num1 + num2;
    
    // Display result
    printf("Sum of %d and %d is: %d\n", num1, num2, sum);
    
    return 0;
}