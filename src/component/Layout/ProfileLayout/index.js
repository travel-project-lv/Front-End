import Header from "../DefaultLayout/Header";
import Footer from "../DefaultLayout/Footer";
import ProfileInfo from "~/pages/Profile/ProfileInfo";
import { Container } from "@mui/material";

function ProfileLayout({ children }) {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" style={{ padding: "20px 68px" }}>
        <div className="container" style={{display:'flex',justifyContent:'space-between'}}>
          <ProfileInfo />
          <div className="content">{children}</div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ProfileLayout;
