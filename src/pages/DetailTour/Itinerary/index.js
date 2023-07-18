import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

function Itinerary() {
  return (
    <div>
      {/* Time-line */}
      <div>
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0", flex: "0 0 14%" , fontSize:'14px' , fontWeight:'600',textAlign:'justify' }}
              align="right"
              variant="body2"
            >
               Ngày 1: 03/06/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontSize: "18px" }}>
                    <h4>
                      Ngày 1 - BÀ RỊA VŨNG TÀU – ĐÀ LẠT - Ăn 03 bữa (Sáng, Trưa,
                      Tối)
                    </h4>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ fontSize: "16px" }}>
                    <p>Quý khách tập trung tại điểm hẹn :</p>
                    <ul style={{ marginLeft: "30px", paddingTop: "10px" }}>
                      <li>
                        <strong>04:30 sáng tại VP Vietravel Vũng Tàu</strong> –
                        số 150 Trương Công Định, P.3
                      </li>
                      <li>
                        <strong>05:00 sáng tại VP Vietravel Bà Rịa</strong> – số
                        33 Lê Quý Đôn, P. Phước Trung
                        <br />
                        &nbsp;
                      </li>
                    </ul>
                    <p>
                      Đoàn khởi hành đi Đà Lạt, ăn sáng trên đường đi. Đến Di
                      Linh, đoàn tham quan Thác Bobla &nbsp;- đẹp như một bức
                      tranh thiên nhiên với dòng thác nguyên sơ, hùng vĩ cao hơn
                      40m, rộng hơn 20m, cùng cảnh quan được tôn tạo tuyệt đẹp,
                      lưu giữ nhiều cây cổ thụ hàng trăm năm tuổi, phía xa hút
                      tầm mắt là những đồi chè, cà phê xanh mát. Ăn trưa tại KDL
                      thác Bobla.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Buổi chiều tiếp tục hành trình đến Đà Lạt, đoàn nhận phòng
                      khách sạn nghỉ ngơi.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Quý khách ăn tối, sau đó tự do đi dạo Hồ Xuân Hương, mua
                      sắm tại chợ đêm Đà Lạt, sắm cho mình chiếc khăn hoặc áo
                      len để ghi lại những bức ảnh rực rỡ tại phố núi xinh đẹp.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0", flex: "0 0 14%" , fontSize:'14px' , fontWeight:'600',textAlign:'justify' }}
              align="right"
              variant="body2"
            >
              Ngày 2: 04/06/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontSize: "18px" }}>
                    <h4>
                      Ngày 2 - THIỀN VIỆN TRÚC LÂM - LÀNG HOA VẠN THÀNH - Ăn 03
                      bữa (Sáng, trưa, tối)
                    </h4>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ fontSize: "16px" }}>
                    <p>
                      Ăn sáng tại khách sạn, xe đưa đoàn tham quan thành phố Đà
                      Lạt :
                    </p>
                    <p>&nbsp;</p>
                    <ul style={{ marginLeft: "30px", paddingTop: "10px" }}>
                      <li>
                        <strong>Dinh I</strong>: còn được biết đến là Dinh Bảo
                        Đại 1 – King Palace. Tọa lạc tại một ngon đồi xung quanh
                        được bao bọc bởi những rừng thông xanh biếc. Cùng với đó
                        lại nằm cách xa vị trí mặt tiền đường chính. Cho nên
                        khung cảnh cũng như không gian nơi đây trở nên thơ mộng
                        và yên bình hơn bao giờ hết.
                        <br />
                        &nbsp;
                      </li>
                      <li>
                        <strong>Nhà thờ Con Gà</strong>: đây là một trong những
                        công trình kiến trúc tôn giáo với phong cách kiến trúc
                        đặc trưng và tiêu biểu được coi là cổ xưa nhất của Đà
                        Lạt. Được xây dựng từ thời Pháp nhưng đến nay vẫn giữ
                        nguyên được nét hiện trạng ban đầu.
                        <br />
                        &nbsp;
                      </li>
                    </ul>
                    <p>Buổi chiều, đoàn tiếp tục tham quan :</p>
                    <p>&nbsp;</p>
                    <ul style={{ marginLeft: "30px", paddingTop: "10px" }}>
                      <li>
                        <strong>Thiền viện Trúc Lâm</strong>: với quần thể công
                        trình kiến trúc độc đáo, du khách còn được ngắm nhìn các
                        vườn hoa xinh đẹp khoe sắc và toàn cảnh Hồ Tuyền Lâm với
                        thiên nhiên, núi đồi, rừng thông Đà Lạt.
                      </li>
                      <li>
                        <strong>Trang trại rau và hoa Vạn Thành</strong>: du
                        khách sẽ choáng ngợp bởi vẻ quyến rũ của bức tranh tuyệt
                        mỹ được tạo nên bởi vô vàn các loài hoa đua nhau khoe
                        sắc như đóa Hồng, Cẩm Chướng, Lily, Đồng Tiền, Cẩm Tú
                        Cầu… Ngoài ra, Quý khách còn được khám phá quy trình
                        trồng những loại nông sản và thỏa sức chụp hình tại vườn
                        cà chua, bí khổng lồ, dưa Pepino, dâu và các loại rau
                        trồng thủy canh (tùy theo mùa).
                        <br />
                        &nbsp;
                      </li>
                    </ul>
                    <p>Quý khách ăn tối, nghỉ đêm tại Đà Lạt.</p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0", flex: "0 0 14%" , fontSize:'14px' , fontWeight:'600',textAlign:'justify' }}
              align="right"
              variant="body2"
            >
              Ngày 3: 05/06/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontSize: "18px" }}>
                    <h4>
                      Ngày 3 - KDL CAO NGUYÊN HOA – TỰ DO CHỢ ĐÀ LẠT - Ăn 02 bữa
                      (Ăn sáng, trưa, tự túc ăn tối)
                    </h4>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ fontSize: "16px" }}>
                    <p>
                      Sau khi dùng bữa sáng tại khách sạn, xe đưa đoàn tham quan{" "}
                      <strong>KDL Cao Nguyên Hoa</strong> với diện tích hơn
                      122ha, là nơi bảo tồn đa dạng sinh học đặc biệt là các
                      lòai hoa thân gỗ không chỉ có ở Đà Lạt mà còn trên toàn
                      Thế giới với mảng xanh của rừng - thảm cỏ tự nhiên rộng
                      khắp, điểm xuyến những khóm hoa Thanh Anh nhẹ nhàng dọc
                      lối đi. Đến đây Quý khách sẽ được trải nghiệm:
                    </p>
                    <p>&nbsp;</p>
                    <ul style={{ marginLeft: "30px", paddingTop: "10px" }}>
                      <li>
                        <strong>Quán Seven-T Coffee</strong> nằm giữa rừng thông
                        với view 360° núi đồi xanh mát, bể bơi vô cực giữa rừng
                        nhiệt đới.
                      </li>
                      <li>
                        Xả stress và ghi lại những khoảnh khắc đẹp với{" "}
                        <strong>Đà Lạt Swing</strong> – trò chơi “xích đu tiên”
                        lớn nhất Việt Nam.&nbsp;
                      </li>
                      <li>
                        <strong>Rose Garden – Vườn hoa hồng</strong> với hàng
                        trăm gốc hồng ngoại, hồng nội, hồng cổ thụ quý hiếm tỏa
                        hương khoe sắc bốn mùa.&nbsp;
                      </li>
                      <li>
                        Con đường rừng nhiệt đới dẫn lối đến{" "}
                        <strong>gốc si cổ thụ nghìn năm</strong> huyền bí và cổ
                        kính.&nbsp;
                      </li>
                      <li>
                        Thoả sức chụp hình{" "}
                        <strong>check in với dàn siêu xe cực chill</strong>, cực
                        chất hay ngôi nhà phù thủy, đồi mai anh đào, đồi huệ
                        sông nile, đồi hoa sim tím, đồi hoa hoàng yến,…
                      </li>
                    </ul>
                    <p>&nbsp;</p>
                    <p>
                      Đoàn dùng bữa trưa và về lại khách sạn nghỉ ngơi. Buổi
                      chiều Quý khách tự do tham quan khám phá Đà Lạt (tự túc ăn
                      tối và chi phí tham quan, đi lại):
                    </p>
                    <ul style={{ marginLeft: "30px", paddingTop: "10px" }}>
                      <li>Mua đặc sản tại chợ Đà Lạt.</li>
                      <li>
                        Dạo phố ngắm Hồ Xuân Hương, thưởng thức café bờ hồ.
                      </li>
                      <li>
                        Vui chơi tại <strong>Quảng Trường Lâm Viên</strong>,
                        chụp hình với bông hoa Atiso và Cẩm Tú Cầu – biểu tượng
                        của TP Đà Lạt.
                      </li>
                      <li>Nghe nhạc Trịnh tại café Diễm Xưa…</li>
                      <li>
                        Chiêm ngưỡng khung cảnh{" "}
                        <strong>‘‘Thung Lũng Đèn’</strong>’ về đêm tại quán cà
                        phê <strong>Làng Vũ Thị</strong> và thưởng thức cốc cà
                        phê/ ca cao nóng - một trong những nơi sở hữu view ngắm
                        thung lũng đèn ‘‘hot’’ nhất Đà Lạt. Quý khách còn có dịp
                        được tự tay nướng và thưởng thức những củ khoai lang
                        thơm ngon giữa tiết trời se lạnh.
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}

export default Itinerary;
