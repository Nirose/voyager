import { use } from "react";
import {
  CommentView,
  Community,
  CommunityView,
  Person,
  PersonView,
  PostView,
} from "threadiverse";

import { OutletContext } from "#/routes/OutletProvider";
import { useIsSecondColumn } from "#/routes/twoColumn/useIsSecondColumn";

import { buildCommunityLink } from "./appLinkBuilder";
import { getHandle } from "./lemmy";
import { useBuildGeneralBrowseLink } from "./routes";
import { alreadyHere } from "./toastMessages";
import useAppToast from "./useAppToast";
import { useOptimizedIonRouter } from "./useOptimizedIonRouter";

export default function useAppNavigation() {
  const router = useOptimizedIonRouter();
  const buildGeneralBrowseLink = useBuildGeneralBrowseLink();
  const presentToast = useAppToast();
  const { isTwoColumnLayout, setSecondColumnLocation } = use(OutletContext);
  const isSecondColumn = useIsSecondColumn();

  function pushRouteIfNeeded(route: string) {
    if (router.getRouteInfo()?.pathname === route) {
      presentToast(alreadyHere);
      return "already-there";
    }

    router.push(route);
    return "success";
  }

  function navigateToPost(post: PostView) {
    const path = buildGeneralBrowseLink(
      `/c/${getHandle(post.community)}/comments/${post.post.id}`,
    );

    if (isTwoColumnLayout && !isSecondColumn) {
      setSecondColumnLocation(path);
      return "success"; // TODO: return if already there
    }

    return pushRouteIfNeeded(path);
  }

  function navigateToCommunity(community: CommunityView | Community) {
    return pushRouteIfNeeded(
      buildGeneralBrowseLink(
        buildCommunityLink(
          "community" in community ? community.community : community,
        ),
      ),
    );
  }

  function navigateToUser(user: PersonView | Person | string) {
    const getPath = (handle: string) => `/u/${handle}`;

    if (typeof user === "string") {
      return pushRouteIfNeeded(buildGeneralBrowseLink(getPath(user)));
    }

    const person = "person" in user ? user.person : user;
    return pushRouteIfNeeded(
      buildGeneralBrowseLink(getPath(getHandle(person))),
    );
  }

  function navigateToComment(comment: CommentView) {
    const path = buildGeneralBrowseLink(
      `/c/${getHandle(comment.community)}/comments/${comment.post.id}/${
        comment.comment.path
      }`,
    );

    if (isTwoColumnLayout && !isSecondColumn) {
      setSecondColumnLocation(path);
      return "success"; // TODO: return if already there
    }

    return pushRouteIfNeeded(path);
  }

  return {
    navigateToComment,
    navigateToCommunity,
    navigateToPost,
    navigateToUser,
  };
}
