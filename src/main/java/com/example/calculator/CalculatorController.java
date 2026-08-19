package com.example.calculator;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.calculator.CalculatorService;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    private final CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {

        this.calculatorService = calculatorService;

    }

    @PostMapping("/add")
    public ResponseEntity<Double> add(
            @RequestBody CalculationRequest request) {

        double result = calculatorService.add(
                request.getNumber1(),
                request.getNumber2()
        );

        return ResponseEntity.ok(result);
    }


    @PostMapping("/subtract")
    public ResponseEntity<Double> subtract(
            @RequestBody CalculationRequest request) {

        double result = calculatorService.subtract(
                request.getNumber1(),
                request.getNumber2()
        );

        return ResponseEntity.ok(result);
    }


    @PostMapping("/multiply")
    public ResponseEntity<Double> multiply(
            @RequestBody CalculationRequest request) {

        double result = calculatorService.multiply(
                request.getNumber1(),
                request.getNumber2()
        );

        return ResponseEntity.ok(result);
    }


    @PostMapping("/divide")
    public ResponseEntity<Double> divide(
            @RequestBody CalculationRequest request) {

        try {

            double result = calculatorService.divide(
                    request.getNumber1(),
                    request.getNumber2()
            );

            return ResponseEntity.ok(result);

        } catch (ArithmeticException e) {

            return ResponseEntity.badRequest().build();

        }
    }
}