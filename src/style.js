import { Platform } from "react-native";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const colors = {
  brandRed: "#DA291C",
  dark: "#222",
  light: "#eee",
  brand: "#445AEB",
};

const styles = StyleSheet.create({
  //Global
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
  },

  layout: {
    flex: 1,
    padding: 24,
    width: windowWidth,
  },

  scrollViewNudge: {
    paddingBottom: 50,
    backgroundColor: "transparent",
  },

  backArrow: {
    top: 0,
    right: 0,
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7D7C7E",
  },

  bold: {
    fontWeight: 800,
  },

  text: {
    color: colors.light,
  },

  redText: {
    color: "#DA291C",
    letterSpacing: -2,
  },

  silverText: {
    color: "#7D7C7E",
    marginTop: -10,
    letterSpacing: -2,
  },

  redBg: {
    backgroundColor: "rgba(218, 41, 28, 0.7)",
  },

  blackBg: {
    backgroundColor: "rgba(36, 31, 31, 0.7)",
  },

  marginBoost: {
    margin: 10,
  },

  buttonPrimary: {
    backgroundColor: "#241F1F",
    color: "#fff",
    textTransform: "capitalize",
    paddingVertical: 14,
    margin: 5,
  },

  buttonSecondary: {
    backgroundColor: "#7D7C7E",
    color: "#fff",
    textTransform: "capitalize",
    paddingVertical: 14,
    margin: 5,
  },

  buttonWhite: {
    backgroundColor: "#FFF",
    color: "red",
    textTransform: "capitalize",
    paddingVertical: 14,
    margin: 5,
  },

  buttonExtra: {
    backgroundColor: "#DA291C",
    color: "#fff",
    textTransform: "capitalize",
    paddingVertical: 14,
    marginHorizontal: "auto",
    margin: 5,
  },

  stretchButton: {
    width: "100%",
  },

  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark,
    // maxWidth: "85%",
  },

  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },

  captionText: {
    padding: 5,
    color: colors.light,
  },

  headerText: {
    letterSpacing: 2,
    textTransform: "capitalize",
  },

  largeSpaceText: {
    letterSpacing: 2,
    marginVertical: 15,
    color: colors.light,
  },

  letterSpacing: {
    letterSpacing: 7,
  },

  linkText: {
    marginTop: 4,
  },

  whiteText: {
    color: "#fff",
  },

  forms: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "transparent",
  },

  formsLogo: {
    width: 100,
    height: 100,
  },

  bottomSilverTriangle: {
    position: "absolute",
    bottom: -380,
    right: -220,
  },

  bottomRedTriangle: {
    position: "absolute",
    bottom: -160,
    right: -50,
  },

  bottomWhiteTriangle: {
    position: "absolute",
    bottom: -230,
    left: -30,
    opacity: 0.95,
  },

  bottomBlackTriangle: {
    position: "absolute",
    bottom: -230,
    right: -30,
    opacity: 0.95,
    transform: [{ scaleX: -1 }],
  },

  input: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: colors.light,
    color: colors.light,
    borderRadius: 0,
    fontSize: 38,
  },

  centerText: {
    textAlign: "center",
  },

  tabBar: {
    flexDirection: "row",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 35,
    marginHorizontal: 5,
  },

  lottie: {
    width: 100,
    height: 100,
  },

  markerFixed: {
    top: "45%",
    left: "45%",
    position: "absolute",
    alignItems: "center",
  },

  marker: {
    height: 48,
    width: 48,
  },

  map: {
    flex: 1,
    justifyContent: "center",
  },

  fullScreenMap: {
    flex: 1,
  },

  cog: {
    marginVertical: 25,
    marginLeft: 40,
    width: 25,
    height: 25,
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    elevation: 5,
  },

  modalContainer: {
    backgroundColor: "#DA291C",
    borderRadius: 15,
    padding: 30,
  },

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  //WelcomePage
  welcomeHeader: {
    flex: 2,
    alignItems: "center",
    padding: 10,
    width: "100%",
    top: "10%",
    marginVertical: 25,
  },

  welcomeHeaderBadge: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "center",
    padding: 20,
    marginTop: 25,
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "100%",
  },

  welcomeLogo: {
    width: 175,
    height: 175,
  },

  welcomeTriangle: {
    position: "absolute",
    bottom: -120,
    right: -30,
  },

  welcomeActions: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginVertical: 25,
  },

  //LoginPage
  loginHeader: {
    flex: 3,
    alignItems: "center",
    padding: 10,
    width: "100%",
    top: 0,
    marginVertical: 25,
  },

  loginLogo: {
    width: 150,
    height: 150,
  },

  loginTriangle: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    top: -120,
    left: -58,
  },

  //RegisterPage
  registerHeader: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    top: 0,
    marginVertical: 25,
    backgroundColor: "transparent",
  },

  registerHeaderBadge: {
    flex: 2,
    justifyContent: "center",
    padding: 20,
    marginTop: 25,
    lineHeight: 1,
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "100%",
  },

  selectInput: {
    width: "95%",
    marginVertical: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
  },

  selectInputWhite: {
    borderBottomColor: "white",
  },

  selectInputDanger: {
    borderBottomColor: colors.brandRed,
  },

  toggleRadio: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginTop: 15,
  },

  //DashPage
  dashContainer: {
    backgroundColor: "transparent",
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  dashUserHeader: {
    marginHorizontal: 5,
    top: 0,
    backgroundColor: "transparent",
  },

  callBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dashButtonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
  },

  dashButton: {
    flex: 1,
    height: 120,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
    overflow: "hidden",
  },

  dashButtonText: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "white",
  },

  userCard: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
  },

  cardLogo: {
    width: 80,
    height: 80,
  },

  userDetails: {
    flexDirection: "column",
    justifyContent: "center",
  },

  dashDrawer: {
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  errorIcon: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 50,
    height: 50,
  },

  drawerHeight: {
    height: 135,
  },

  bankCard: {
    width: 300,
    height: 190,
    marginTop: 35,
    padding: 20,
    elevation: 1,
    shadowColor: "red",
    shadowRadius: 15,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },

  bankCardContent: {
    top: 50,
    backgroundColor: "transparent",
  },

  paymentButton: {
    top: -5,
    backgroundColor: "#7d7c7e",
    paddingVertical: 15,
    paddingHorizontal: 35,
    textAlign: "center",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 0,
  },

  backCardButton: {
    alignSelf: "center",
    top: -10,
    backgroundColor: "#7d7c7e",
    width: 200,
    textAlign: "center",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 0,
  },

  cardButton: {
    top: -35,
    backgroundColor: "#7d7c7e",
    paddingHorizontal: 30,
    textAlign: "center",
    zIndex: 0,
  },

  //RegisterPage
  settingsHeader: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    top: 0,
    marginVertical: 25,
    backgroundColor: "transparent",
  },

  settingsActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    backgroundColor: "transparent",
    marginVertical: 10,
  },

  actionIconSmall: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 45,
    height: 45,
  },

  //Payment
  darkerForm: {
    backgroundColor: "#7D7C7E",
    top: -15,
    zIndex: 0,
    padding: 15,
    justifyContent: "center",
    alignItem: "center",
    borderRadius: 5,
    width: "100%",
  },

  payContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  cardsContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    height: 235,
    marginBottom: 0,
    zIndex: 1,
  },

  payHeader: {
    flex: 3,
    alignItems: "center",
    paddingTop: 10,
    width: "100%",
    top: 0,
    marginTop: 25,
  },
});

export { styles, colors };
