import { workspaceAuthEnabled } from '../../config/workspace';
import NotFound from '../NotFound';
import WorkspaceApp from './WorkspaceApp';

/**
 * Private workspace: without Cognito env, behave like a missing page for guests.
 * With Cognito configured, show sign-in then the gated shell.
 */
export default function Workspace() {
  if (!workspaceAuthEnabled) {
    return <NotFound />;
  }
  return <WorkspaceApp />;
}
