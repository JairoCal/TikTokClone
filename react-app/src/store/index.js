import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import following from "./following";
import friendsFeed from "./friendsfeed";
import categoriesFeed from "./foryou";
import allVideos from "./allvideos";
import modal from "./modal";
import modal2 from "./modal2";
import privateMessageRecipients from "./privateMessageRecipients";
import privateMessages from "./ PrivateMessages";
import videoComments from "./Comments";
import userInfo from "./UserInfo";
import userId from "./User";
import userName from "./UserName";
import categories from "./Categories";
import video from "./uploadvideo";
import VideoId from "./VideoId";
import UserVideos from "./UsersVideos";
import userCategories from "./myCategories";
import categoriesBoolean from "./FollowCategory";

const rootReducer = combineReducers({
  session,
  following,
  friendsFeed,
  categoriesFeed,
  allVideos,
  modal,
  privateMessageRecipients,
  privateMessages,
  videoComments,
  userInfo,
  userId,
  userName,
  categories,
  video,
  modal2,
  VideoId,
  UserVideos,
  userCategories,
  categoriesBoolean,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
