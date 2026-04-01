import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  Divider,
  Checkbox,
  Chip,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTheme } from "@mui/material";
import { useSupabase } from "../../contextProvider/SupabaseProvider";

const NotificationsDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const {
    fetchNotifications,
    markAllNotificationsRead,
    clearNotifications,
    markSingleNotificationsRead,
    deleteNotification,
  } = useSupabase();

  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState("all");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!open) return;

    const loadNotifications = async () => {
      const data = await fetchNotifications();
      if (data) setNotifications(data);
    };

    loadNotifications();
    console.log(notifications);
  }, [open]);

  /* ---------------- FILTER ---------------- */
  const filteredNotifications = notifications.filter((n) => {
    if (tab === "unread") return !n.is_read;
    if (tab === "important") return n.is_important;
    return true;
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          maxHeight: "85vh",
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(0,0,0,0.3)",
        },
      }}>
      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                bgcolor: theme.palette.primary.main + "20",
                p: 1,
                borderRadius: 2,
                display: "flex",
              }}>
              <NotificationsIcon color="primary" />
            </Box>

            <Typography variant="h6" fontWeight={700}>
              Notifications
            </Typography>
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* TABS & ACTIONS */}
        <Box sx={{ px: 3, pt: 1 }}>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="primary"
            indicatorColor="primary">
            <Tab label="All" value="all" />
            <Tab label="Unread" value="unread" />
            <Tab label="Important" value="important" />
          </Tabs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              mb: 1,
            }}>
            <Chip
              label={`${notifications.filter((n) => !n.is_read).length} New Alerts`}
              color="error"
              size="small"
              variant="outlined"
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                startIcon={<DoneAllIcon />}
                onClick={async () => {
                  await markAllNotificationsRead();
                  window.dispatchEvent(new Event("notificationsUpdated"));
                  const refreshed = await fetchNotifications();
                  setNotifications(refreshed);
                }}>
                Mark all as read
              </Button>

              <Button
                size="small"
                color="error"
                startIcon={<DeleteSweepIcon />}
                onClick={async () => {
                  await clearNotifications();
                  window.dispatchEvent(new Event("notificationsUpdated"));
                  setNotifications([]);
                }}>
                Clear all
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* BODY */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          ) : (
            filteredNotifications.map((n) => (
              <NotificationItem
                key={n.id}
                n={n}
                theme={theme}
                onToggleRead={async (newValue) => {
                  await markSingleNotificationsRead(n.id, newValue);
                  window.dispatchEvent(new Event("notificationsUpdated"));
                  setNotifications((prev) =>
                    prev.map((x) =>
                      x.id === n.id ? { ...x, is_read: newValue } : x,
                    ),
                  );
                }}
                onClick={async () => {
                  if (n.is_read) return;
                  await markSingleNotificationsRead(n.id, true);
                  window.dispatchEvent(new Event("notificationsUpdated"));
                  setNotifications((prev) =>
                    prev.map((x) =>
                      x.id === n.id ? { ...x, is_read: true } : x,
                    ),
                  );
                }}
                onDelete={async () => {
                  await deleteNotification(n.id);
                  window.dispatchEvent(new Event("notificationsUpdated"));
                  setNotifications((prev) => prev.filter((x) => x.id !== n.id));
                }}
              />
            ))
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;

const NotificationItem = ({ n, theme, onToggleRead, onClick, onDelete }) => {
  const active = !n.is_read;

  return (
    <Box
      onClick={onClick}
      sx={{
        px: 3,
        py: 2.5,
        display: "flex",
        gap: 2,
        cursor: "pointer",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: active ? theme.palette.primary.main + "12" : "transparent",
        "&:hover": {
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.03)",
        },
        position: "relative",
      }}>
      {active && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: "primary.main",
            borderRadius: "0 4px 4px 0",
          }}
        />
      )}

      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: n.icon_bg || theme.palette.primary.main + "20",
          color: n.icon_color || theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}>
        <span className="material-symbols-outlined">{n.icon}</span>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{n.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {n.description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 0.5,
        }}>
        <Typography
          variant="caption"
          color={active ? "primary.main" : "text.secondary"}>
          {new Date(n.created_at).toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={n.is_read}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onToggleRead(!n.is_read)}
            color="primary"
            size="small"
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            sx={{
              color: "text.disabled",
              "&:hover": {
                color: "error.main",
                bgcolor: "error.main" + "15",
              },
            }}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
