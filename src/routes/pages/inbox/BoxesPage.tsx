import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  albumsOutline,
  chatbubbleOutline,
  ellipseOutline,
  fileTray,
  mail,
  personCircleOutline,
} from "ionicons/icons";
import { MouseEvent, use, useRef } from "react";

import { useSetActivePage } from "#/features/auth/AppContext";
import { PageContext } from "#/features/auth/PageContext";
import BoxesRedirectBootstrapper from "#/features/inbox/BoxesRedirectBootstrapper";
import { getInboxCounts } from "#/features/inbox/inboxSlice";
import AppContent from "#/features/shared/AppContent";
import AppHeader from "#/features/shared/AppHeader";
import { useAppDispatch } from "#/store";

export default function BoxesPage() {
  const pageRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  const { presentLoginIfNeeded } = use(PageContext);

  useSetActivePage(pageRef);

  useIonViewWillEnter(() => {
    dispatch(getInboxCounts());
  });

  function interceptIfLoggedOut(e: MouseEvent) {
    if (presentLoginIfNeeded()) e.preventDefault();
  }

  return (
    <>
      <BoxesRedirectBootstrapper />
      <IonPage ref={pageRef}>
        <AppHeader>
          <IonToolbar>
            <IonTitle>Boxes</IonTitle>
          </IonToolbar>
        </AppHeader>
        <AppContent scrollY fullscreen color="light">
          <AppHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Boxes</IonTitle>
            </IonToolbar>
          </AppHeader>

          <IonList inset color="primary">
            <IonItem
              routerLink="/inbox/all"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon icon={fileTray} color="primary" slot="start" />
              <IonLabel className="ion-text-nowrap">Inbox (All)</IonLabel>
            </IonItem>
            <IonItem
              routerLink="/inbox/unread"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon icon={ellipseOutline} color="primary" slot="start" />
              <IonLabel className="ion-text-nowrap">Unread</IonLabel>
            </IonItem>
          </IonList>

          <IonList inset color="primary">
            <IonItem
              routerLink="/inbox/post-replies"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon icon={albumsOutline} color="primary" slot="start" />
              <IonLabel className="ion-text-nowrap">Post Replies</IonLabel>
            </IonItem>
            <IonItem
              routerLink="/inbox/comment-replies"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon icon={chatbubbleOutline} color="primary" slot="start" />
              <IonLabel className="ion-text-nowrap">Comment Replies</IonLabel>
            </IonItem>
            <IonItem
              routerLink="/inbox/mentions"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon
                icon={personCircleOutline}
                color="primary"
                slot="start"
              />
              <IonLabel className="ion-text-nowrap">Mentions</IonLabel>
            </IonItem>
          </IonList>

          <IonList inset color="primary">
            <IonItem
              routerLink="/inbox/messages"
              onClick={interceptIfLoggedOut}
              detail
            >
              <IonIcon icon={mail} color="primary" slot="start" />
              <IonLabel className="ion-text-nowrap">Messages</IonLabel>
            </IonItem>
          </IonList>
        </AppContent>
      </IonPage>
    </>
  );
}
