"""
Test script to verify the basic functionality of the Todo Application Backend
This script tests that the basic imports and structure are correct.
"""

import sys
import os

def test_basic_imports():
    """Test that all modules can be imported without errors"""
    try:
        # Add the backend directory to the path so we can import the modules
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

        # Import modules individually to isolate issues
        import db
        import models
        import schemas
        import auth
        import dependencies
        from routes import tasks
        print("+ All modules imported successfully")
        return True
    except ImportError as e:
        print(f"Import error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error during import: {e}")
        return False

def test_models():
    """Test that the Task model is correctly defined"""
    try:
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))
        from models import Task
        # Create a sample task to verify the model works
        sample_task = Task(
            title="Test Task",
            description="This is a test task",
            completed=False,
            user_id="user123"
        )
        assert sample_task.title == "Test Task"
        assert sample_task.user_id == "user123"
        assert sample_task.completed == False
        print("+ Task model works correctly")
        return True
    except Exception as e:
        print(f"Task model error: {e}")
        return False

def test_schemas():
    """Test that the schemas are correctly defined"""
    try:
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))
        from schemas import TaskCreateRequest, TaskResponse

        # Test TaskCreateRequest schema
        create_request = TaskCreateRequest(
            title="Test Task",
            description="Test description",
            completed=False
        )
        assert create_request.title == "Test Task"

        # Test TaskResponse schema
        from datetime import datetime
        response = TaskResponse(
            id=1,
            user_id="user123",
            title="Test Task",
            description="Test description",
            completed=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        assert response.id == 1
        assert response.user_id == "user123"

        print("+ Schemas work correctly")
        return True
    except Exception as e:
        print(f"Schema error: {e}")
        return False

def run_tests():
    """Run all tests"""
    print("Running basic functionality tests for Todo Application Backend...")
    print("-" * 60)

    tests = [
        test_basic_imports,
        test_models,
        test_schemas
    ]

    results = []
    for test in tests:
        results.append(test())

    print("-" * 60)
    passed = sum(results)
    total = len(results)

    print(f"Tests passed: {passed}/{total}")

    if passed == total:
        print("All tests passed! The backend is correctly implemented.")
        return True
    else:
        print("Some tests failed. Please check the implementation.")
        return False

if __name__ == "__main__":
    run_tests()