import logoImg from "../../assets/image/ism-online-logo_300.png"
import styles from "./index.module.css"

function Footer() {
    return (
        <>
            <div className={`py-3 ${styles.footerInfo}`}>
                <div className="text-center">
                    <img src={logoImg} className={`rounded-4 ${styles.footerLogo}`} alt="iSMART Online" />
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center">
                                Đơn vị cung cấp giải pháp học tập tiếng Anh trực tuyến giúp con trở nên linh hoạt và thích nghi với cuộc sống số hóa; đảm bảo con bạn luôn tiên phong trong kỷ nguyên số hóa đang ngày càng phát triển, vững chắc 1 vị trí trên chuyến tàu trở thành công dân toàn cầu.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center text-lg-start">
                        <div className="col-lg-5 offset-lg-1 mb-3 mb-lg-0">
                            <strong>Address:</strong>
                            <br />
                            Lầu 3, tòa nhà Quỳnh Lan, 60 Hai Bà Trưng,
                            <br />
                            Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
                        </div>
                        <div className="col-lg-5 offset-lg-1 mb-3 mb-lg-0">
                            <strong>Hotline:</strong> 1900 0888 93 - nhánh 2
                            <br />
                            <strong>Email:</strong> info@ismartonline.edu.vn
                            <br />
                            <strong>Website:</strong> <a href="https://ismartonline.edu.vn" target="_blank" rel="noreferrer" className="text-reset">https://ismartonline.edu.vn</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-3 ${styles.footerCopyright}`}>
                <div className="text-center">
                    {/* Chính Sách Bảo Mật Quyền Riêng Tư
                    <span className="mx-4">|</span> */}
                    2024 © Bản quyền thuộc về iSMART Online
                </div>
            </div>
        </>
    )
}

export default Footer