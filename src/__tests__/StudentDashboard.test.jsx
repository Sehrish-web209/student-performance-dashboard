import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StudentDashboard from '../StudentDashboard';

describe('StudentDashboard Component', () => {
  it('renders dashboard title', () => {
    render(<StudentDashboard />);
    expect(screen.getByText(/Student Performance Dashboard/i)).toBeDefined();
  });
});