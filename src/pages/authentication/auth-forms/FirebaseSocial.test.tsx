/**
 *  FirebaseSocial.test.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { render } from '@testing-library/react';
import { afterEach, assert, describe, expect, it, vi } from 'vitest';
import { authService } from '../../../services/authService';
import FirebaseSocial from './FirebaseSocial';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //


describe('FirebaseSocial tests', () => {
  const signInWithGoogleSpy = vi.spyOn(authService, 'signInWithGoogle');
  const signInWithAzureSpy = vi.spyOn(authService, 'signInWithAzure');

  it('should render the app', () => {
    const element = render(<FirebaseSocial />);
    assert.isNotNull(element.queryByText('Google'));
    assert.isNotNull(element.queryByText('Microsoft'));
  });

  it('Google button should work', () => {
    const element = render(<FirebaseSocial />);
    const button = element.queryByTitle('Login with Google');
    button?.click();
    expect(signInWithGoogleSpy).toHaveBeenCalledTimes(1);
  });

  it('Microsoft button should  work', () => {
    const element = render(<FirebaseSocial />);
    const button = element.queryByText('Microsoft');
    button?.click();
    expect(signInWithAzureSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

});

