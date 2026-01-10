import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { setLanguageSwitchingEnabled } from "../../actions/user.actions";
import { produceAppState, useAppStore } from "../../store";
import {
  AGENT_DICTATE_HOTKEY,
  DICTATE_HOTKEY,
  SWITCH_LANGUAGE_HOTKEY,
} from "../../utils/keyboard.utils";
import { getMyUserPreferences } from "../../utils/user.utils";
import { HotkeySetting } from "./HotkeySetting";

export const ShortcutsDialog = () => {
  const { open, hotkeysStatus } = useAppStore((state) => ({
    open: state.settings.shortcutsDialogOpen,
    hotkeysStatus: state.settings.hotkeysStatus,
  }));

  const languageSwitchingEnabled = useAppStore(
    (state) => getMyUserPreferences(state)?.languageSwitchingEnabled ?? false,
  );

  const handleClose = () => {
    produceAppState((draft) => {
      draft.settings.shortcutsDialogOpen = false;
    });
  };

  const handleToggleLanguageSwitching = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const enabled = event.target.checked;
    void setLanguageSwitchingEnabled(enabled);
  };

  const renderContent = () => {
    if (hotkeysStatus === "loading") {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ py: 4 }}
        >
          <CircularProgress size={24} />
        </Stack>
      );
    }

    return (
      <Stack spacing={3}>
        <HotkeySetting
          title={<FormattedMessage defaultMessage="Start/stop dictating" />}
          description={
            <FormattedMessage defaultMessage="Start recording audio and transcribe your speech into text with AI." />
          }
          actionName={DICTATE_HOTKEY}
        />
        <HotkeySetting
          title={<FormattedMessage defaultMessage="Agent mode" />}
          description={
            <FormattedMessage defaultMessage="Dictate commands for the AI to follow instead of just cleaning up text." />
          }
          actionName={AGENT_DICTATE_HOTKEY}
        />

        <Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{ mb: 2 }}
          >
            <Stack spacing={1} flex={1}>
              <Typography variant="body1" fontWeight="bold">
                <FormattedMessage defaultMessage="Switch dictation language" />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage defaultMessage="Quickly switch between your primary and secondary dictation languages." />
              </Typography>
            </Stack>
            <Switch
              checked={languageSwitchingEnabled}
              onChange={handleToggleLanguageSwitching}
            />
          </Stack>

          {languageSwitchingEnabled && (
            <Box sx={{ pl: 2 }}>
              <HotkeySetting
                title={
                  <FormattedMessage defaultMessage="Language switch hotkey" />
                }
                description={
                  <FormattedMessage defaultMessage="Press to toggle between primary and secondary language." />
                }
                actionName={SWITCH_LANGUAGE_HOTKEY}
                buttonSize="small"
                hideActionButtons
              />
            </Box>
          )}
        </Box>
      </Stack>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack spacing={1}>
          <Typography variant="h6">
            <FormattedMessage defaultMessage="Keyboard shortcuts" />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <FormattedMessage defaultMessage="Customize your keyboard shortcuts. Keyboard shortcuts can be triggered from within any app." />
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <FormattedMessage defaultMessage="Close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
