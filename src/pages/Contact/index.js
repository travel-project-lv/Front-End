import styles from "./Contact.module.scss";
import classNames from "classnames/bind";
import ContactList from "./ContactList";
import {
  faFax,
  faLocationDot,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Button, TextField } from "@mui/material";
import MapContact from "./Map";
const cx = classNames.bind(styles);

function Contact() {
  return (
    <div className={cx("contact-container")}>
      <div className={cx("contact-heading")}>
        <div className={cx("contact-heading-content")}>
          <h1>Travel</h1>
          <h1>Hãy để chúng tôi biết điều gì chúng tôi có thể giúp bạn</h1>
          <p>
            Hãy để chúng tôi giúp bạn tìm kiếm trải nghiệm du lịch tuyệt vời
          </p>
        </div>
      </div>
      <div className={cx("contact-body")}>
        <div className={cx("contact-body-col")}>
          <h3>Liên hệ với đại lý của chúng tôi</h3>
          <p>
            Chúng tôi mong muốn được lắng nghe từ bạn! Liên hệ với đại lý du
            lịch của chúng tôi ngay hôm nay để khám phá những chuyến đi tuyệt
            vời và trải nghiệm độc đáo. Chúng tôi sẵn lòng giúp bạn tạo ra những
            kỷ niệm vô giá và hướng dẫn bạn qua mọi chi tiết. Hãy đặt lịch ngay
            để bắt đầu hành trình khám phá mới!
          </p>
        </div>
        <div className={cx("contact-body-col")}>
          <h3>Thông tin liên hệ</h3>
          <div className={cx("contact-list")}>
            <ContactList
              icon={faLocationDot}
              text="180 Cao Lỗ, Phường 4, Quận 8, Tp. Hồ Chí Minh"
            />
            <ContactList icon={faPhone} text="(028) 38 505 520" />
            <ContactList icon={faFax} text=" (84.8) 3850 6595" />
            <ContactList icon={faMailBulk} text="contact@stu.edu.vn" />
            <ContactList
              icon={faLocationDot}
              text="180 Cao Lỗ, Phường 4, Quận 8, Tp. Hồ Chí Minh"
            />
          </div>
        </div>
        <div className={cx("contact-body-col")}>
          <h3>Đặt câu hỏi</h3>
          <div className={cx("any-question-container")}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ marginTop: "10px" }}
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={10}
              style={{ marginTop: "10px" }}
              placeholder="Nhập câu hỏi"
            />
            <Button
              variant="outlined"
              style={{ marginTop: "10px", width: "120px" }}
            >
              Gửi câu hỏi
            </Button>
          </div>
        </div>
      </div>
        <div style={{width:'100%',height:'500px'}}>
            <MapContact />
        </div>
    </div>
  );
}

export default Contact;
