import { renderHook, act } from '@testing-library/react';
import { RoleProvider, useRole } from './RoleContext';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('RoleContext', () => {
  it('should switch roles and persist in localStorage', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <RoleProvider>{children}</RoleProvider>;
    const { result } = renderHook(() => useRole(), { wrapper });

    expect(result.current.role).toBe('Intern');

    act(() => {
      result.current.setRole('Admin');
    });

    expect(result.current.role).toBe('Admin');
    expect(localStorage.getItem('role')).toBe('Admin');
  });
});
