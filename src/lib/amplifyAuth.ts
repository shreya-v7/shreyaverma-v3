import { Amplify } from 'aws-amplify';
import { workspaceAuthEnabled } from '../config/workspace';

let configured = false;

export function configureAmplifyAuth(): void {
  if (configured || !workspaceAuthEnabled) return;
  const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID as string;
  const userPoolClientId = import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID as string;
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        loginWith: { email: true },
      },
    },
  });
  configured = true;
}
