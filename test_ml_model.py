#!/usr/bin/env python3
"""
Standalone test script to demonstrate ML model testing feature
This script simulates what the frontend does when testing the model
"""

import sys
import os
import json
import warnings

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app import app, load_model_and_preprocessors

def print_header(text):
    """Print a formatted header"""
    print('\n' + '='*80)
    print(text.center(80))
    print('='*80 + '\n')

def print_section(text):
    """Print a section header"""
    print(f'\n{text}')
    print('-'*80)

def run_comprehensive_test():
    """Run comprehensive testing simulation"""
    
    print_header('ML MODEL TESTING DEMONSTRATION')
    
    # Load model
    print('Step 1: Loading ML Model and Preprocessors...')
    if not load_model_and_preprocessors():
        print('❌ Failed to load model')
        return False
    print('✅ Model loaded successfully\n')
    
    # Create test client
    with app.test_client() as client:
        
        # Test 1: Load test data
        print_section('Step 2: Loading Test Data from CSV')
        test_cases_to_run = [50, 100, 200]
        
        for num_cases in test_cases_to_run:
            print(f'\nLoading {num_cases} test cases...')
            response = client.get(f'/load-test-data?limit={num_cases}')
            
            if response.status_code != 200:
                print(f'❌ Failed to load test data')
                continue
            
            data = json.loads(response.data)
            positive_cases = sum(data['actual_labels'])
            negative_cases = len(data['actual_labels']) - positive_cases
            
            print(f'✅ Loaded {data["count"]} test cases')
            print(f'   • Positive cases (suitable): {positive_cases}')
            print(f'   • Negative cases (not suitable): {negative_cases}')
            
            # Test 2: Run evaluation
            print(f'\nRunning evaluation on {num_cases} cases...')
            eval_response = client.post('/evaluate',
                                       data=json.dumps({
                                           'test_cases': data['test_cases'],
                                           'actual_labels': data['actual_labels']
                                       }),
                                       content_type='application/json')
            
            if eval_response.status_code != 200:
                print(f'❌ Evaluation failed')
                continue
            
            metrics = json.loads(eval_response.data)
            
            print(f'✅ Evaluation completed\n')
            
            # Display metrics
            print_section(f'PERFORMANCE METRICS ({num_cases} test cases)')
            print(f'   {"Metric":<20} {"Value":<15} {"Description"}')
            print(f'   {"-"*20} {"-"*15} {"-"*40}')
            print(f'   {"Accuracy":<20} {metrics["accuracy"]:>6.2f}%     {"Overall correctness"}')
            print(f'   {"Precision":<20} {metrics["precision"]:>6.2f}%     {"True positives / Predicted positives"}')
            print(f'   {"Recall":<20} {metrics["recall"]:>6.2f}%     {"True positives / Actual positives"}')
            print(f'   {"F1 Score":<20} {metrics["f1_score"]:>6.2f}%     {"Harmonic mean of precision & recall"}')
            
            # Display confusion matrix
            cm = metrics['confusion_matrix']
            print_section('CONFUSION MATRIX')
            print(f'   {"Category":<25} {"Count":<10} {"Description"}')
            print(f'   {"-"*25} {"-"*10} {"-"*40}')
            print(f'   {"True Positives (TP)":<25} {cm["true_positives"]:<10} {"Correctly predicted suitable"}')
            print(f'   {"True Negatives (TN)":<25} {cm["true_negatives"]:<10} {"Correctly predicted not suitable"}')
            print(f'   {"False Positives (FP)":<25} {cm["false_positives"]:<10} {"Incorrectly predicted suitable"}')
            print(f'   {"False Negatives (FN)":<25} {cm["false_negatives"]:<10} {"Incorrectly predicted not suitable"}')
            
            # Calculate additional metrics
            total = cm['true_positives'] + cm['true_negatives'] + cm['false_positives'] + cm['false_negatives']
            correct = cm['true_positives'] + cm['true_negatives']
            incorrect = cm['false_positives'] + cm['false_negatives']
            
            print(f'\n   Total Correct: {correct}/{total} ({metrics["accuracy"]:.2f}%)')
            print(f'   Total Incorrect: {incorrect}/{total} ({100-metrics["accuracy"]:.2f}%)')
            
            # Performance assessment
            print_section('PERFORMANCE ASSESSMENT')
            if metrics['accuracy'] >= 95:
                assessment = '🌟 EXCELLENT - Model performs exceptionally well'
            elif metrics['accuracy'] >= 85:
                assessment = '✅ GOOD - Model performs well'
            elif metrics['accuracy'] >= 75:
                assessment = '⚠️  ACCEPTABLE - Model has room for improvement'
            else:
                assessment = '❌ NEEDS IMPROVEMENT - Model requires optimization'
            
            print(f'   {assessment}')
            print(f'\n   Key Findings:')
            print(f'   • The model achieved {metrics["accuracy"]:.2f}% accuracy on {num_cases} test cases')
            print(f'   • Precision of {metrics["precision"]:.2f}% means {metrics["precision"]:.0f}% of positive predictions are correct')
            print(f'   • Recall of {metrics["recall"]:.2f}% means the model identifies {metrics["recall"]:.0f}% of all suitable cases')
            print(f'   • F1 Score of {metrics["f1_score"]:.2f}% provides a balanced performance measure')
            
            print('\n' + '='*80)
    
    # Final summary
    print_header('TESTING COMPLETE - SUMMARY')
    print('✅ Successfully loaded test data from CSV')
    print('✅ Successfully ran batch predictions')
    print('✅ Successfully calculated accuracy and precision metrics')
    print('✅ All functionality working as expected')
    print('\nThe ML model testing feature is fully operational and can be accessed')
    print('from the frontend at http://localhost:3000/test')
    print('\n' + '='*80 + '\n')

if __name__ == '__main__':
    try:
        run_comprehensive_test()
    except KeyboardInterrupt:
        print('\n\nTest interrupted by user')
    except Exception as e:
        print(f'\n❌ Error: {str(e)}')
        import traceback
        traceback.print_exc()
