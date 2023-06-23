import React, { createContext, useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, (data) => {
  console.log("123", data);
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [actionPrev, setActionPrev] = useState();
  const [action, setAction] = useState();
  const [actionNext, setActionNext] = useState();

  const obtainRemoteNotifPermissionsAsync = async () => {
    let permission = await Notifications.getPermissionsAsync();
    if (permission.status !== "granted") {
      permission = await Notifications.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          `We don't have permission to receive remote notifications.`
        );
      }
    }
    return permission;
  };

  const pushNotification = async ({ title, isPlay }) => {
    console.log(`pushNotification: ${title}, isPlay: ${isPlay}`);
    const permission = await obtainRemoteNotifPermissionsAsync();

    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    await Notifications.setNotificationCategoryAsync("musicActions", [
      {
        buttonTitle: "PREV",
        identifier: "prev-track",
        options: {
          opensAppToForeground: false,
        },
      },
      {
        buttonTitle: isPlay ? "PAUSE" : "PLAY",
        identifier: "pause-play",
        options: {
          opensAppToForeground: false,
        },
      },
      {
        buttonTitle: "NEXT",
        identifier: "next-track",
        options: {
          opensAppToForeground: false,
        },
      },
    ])
      .then((_category) => {})
      .catch((error) =>
        console.warn("Could not have set notification category", error)
      );

    await Notifications.scheduleNotificationAsync({
      identifier: "music",
      content: {
        title: title,
        subtitle: "music",
        categoryIdentifier: "musicActions",
        color: "#3B69D5",
        vibrate: false,
        sticky: true,
      },
      trigger: null,
    });
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        if (notification.actionIdentifier == "prev-track") {
          console.log("prev-track");
          actionPrev && actionPrev();
        } else if (notification.actionIdentifier == "pause-play") {
          console.log("pause-play");
          action && action();
        } else if (notification.actionIdentifier == "next-track") {
          console.log("next-track");
          actionNext && actionNext();
        }
      }
    );
    return () => subscription.remove();
  }, [actionPrev, action, actionNext]);

  return (
    <NotificationContext.Provider
      value={{ pushNotification, setActionPrev, setAction, setActionNext }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
