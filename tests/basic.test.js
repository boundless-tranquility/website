describe('Basic Tests', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle DOM elements', () => {
    // Create a test element
    const div = document.createElement('div');
    div.className = 'test-element';
    document.body.appendChild(div);
    
    const element = document.querySelector('.test-element');
    expect(element).toBeTruthy();
    expect(element.className).toBe('test-element');
    
    // Clean up
    document.body.removeChild(div);
  });

  test('should handle fetch mock', () => {
    global.fetch = jest.fn();
    expect(global.fetch).toBeDefined();
  });
}); 