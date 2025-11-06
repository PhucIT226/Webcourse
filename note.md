1.  pool: {

    },
  - Đây là cấu hình connetion pool - tức là nhóm các kết nối mà nodejs có thể tái sử dụng để truy cập vào MySQL mà không cần mở kết nối mới mỗi lần. 
  - Phần Pool này dùng để tối ưu hiệu suất khi nhiều người đăng nhập cùng lúc. Giúp hệ thống chạy nhanh và ổn định hơn

2. Biến môi trường là gì?
  - Biến môi trường là những giá trị được lưu ngoài code, giúp cấu hình ứng dụng mà không cần sửa code
  Mục tiêu: Dễ bảo mật, dễ triển khai, dễ thay đổi giưa môi trường dev và production.

3. NODE_ENV=development
  - Cho biết môi trường đang chạy là gì
    + developer: môi trường phát triển (hiện log, lỗi chi tiết)
    + production: môi trường thực tế (ẩn log, bật bảo mật)

4. DATABASE_LOGGING=false
  - Tắt log câu SQL ra console

5. DB_POOL_IDLE=10000     -   Nếu kết nối rảnh hơn 10s thì tự đóng lại
   DB_POOL_ACQUIRE=30000  -   Chờ tối đa 30s để lấy 1 kết nối trước khi timeout

6. LOG_LEVEL=info - Ghi thông tin bình thường, hoạt động chính

7. up() - Được sequelize gọi khi chạy lệnh migrate -> tạo hoặc thay đổi bảng
8. down() - Được gọi khi rollback migration -> xóa bảng hoặc xóa cột vừa tạo

9. queryInterface - là một đối tượng của Sequelize cho phép ta gửi lệnh SQL đến database

10. UUID - Chuỗi định dạng duy nhất mặc định là UUIDv4 -> ngẫu nhiên
    - UUID là chỗi 128-bit(16byte) - thường dùng biểu diễn dưới dang 36 ký tự(bao gồm dấu -)
    - xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
      + x - Ký tự hex (0–9, a–f)
      + M - Version (1, 3, 4, 5…)
      + Variant (thường là 8, 9, a, hoặc b)

11. onDelete: "RESTRICT" - k cho phép xóa role nễu vẫn còn user dùng role đó
    onDelete: "CASCADE" - khi user bị xóa thì xóa luôn profile của user đó
    onDelete: "SET NULL" - nếu xóa instructor hoặc category thì set null cho cột

12. DATE - dùng để lưu ngày giờ trong DATABASE
13. fn("NOW") - tự động set thời gian hiện tại trong MySQL
14. DATEONLY - Kiểu dữ liệu chỉ chứa ngày k có giờ

15. TEXT kiểu chuỗi văn bản dài, không bị giới hạn như STRING(255)

16. ENUM - nghĩa là giá trị của cột này chỉ được phép nằm trong danh sách cố định 

17. JSON - cho phép lưu trực tiếp object hoặc array trong cột

18. Model - là lớp cơ sở dữ liệu trong Sequelize. Dùng để định nghĩa các bảng trong cơ sở dữ liệu

19. DataTypes - là 1 đối tượng chứa các kiểu dữ liệu mà Sequelize hỗ trợ để định nghĩa cột trong bảng
    | Kiểu dữ liệu        | Mô tả                                        |
    | ------------------- | -------------------------------------------- |
    | `DataTypes.STRING`  | Chuỗi văn bản                                |
| `DataTypes.TEXT`    | Văn bản dài                                  |
    | `DataTypes.INTEGER` | Số nguyên                                    |
    | `DataTypes.FLOAT`   | Số thực                                      |
    | `DataTypes.DATE`    | Ngày tháng và giờ                            |
    | `DataTypes.UUID`    | UUID                                         |
    | `DataTypes.ENUM`    | Giá trị có thể lựa chọn từ danh sách cố định |
    | `DataTypes.BOOLEAN` | Boolean (True/False)                         |
    | `DataTypes.JSON`    | Dữ liệu JSON                                 |

20. class Category extends Model {
      - Category là một class kế thừa từ sequelize.model
      - Đoạn code này dùng để định nghĩa model Category
      - Sequelize sẽ xử dụng để tương tác với bảng categorys trong cơ sở dữ liệu

21. static - là từ khóa dùng để khai báo phương thức hoặc thuộc tính của class
           - được dùng trong Sequelize để khai báo phương thức associate, giúp thiết lập mối quan hệ giữa các bảng mà không cần tạo đối tượng của model.

22. associate(models) - phương thức này dùng để thiết lập các mối quan hệ giữa các bảng (models)
                      - models là đối tượng chứa tất cả các model mà Sequelize biết đến trong dự án.

23. this - trong một phương thức static, từ khóa this tham chiếu đến chính class đó, kp một instance

24. export default (sequelize) => {
      - sequelize ở đâu là một đối tượng được tạo ra từ class Sequelize - chính là kết nối tới database.

25. Category.init() - Dùng để khởi tại model với cấu trúc của bảng categories.
                    - Đây là nơi ta định nghĩa các cột trong bảng này.

26. {
  sequelize,
  modelName: "Category",
  tableName: "categories",
  timestamps: true,
} - Cấu hình model
    + sequelize: liên kết model này với kết nối DB
    +timestamps: true: tạo tự động các cột createAt và updateAt để theo dõi thời gian tạo vào cập nhật của bản ghi

27. User: userModel(sequelize),
    - Tạo model User bằng cách truyền kết nối sequelize vào file user.model.js và lưu kết quả (class User) vào object db.
    -> User: [class User model đã đăng ký],

28. Object.values(db).forEach((model) => {
      if (model?.associate) {
        model.associate(db);
      }
    });
      - Object.values(db) - Lấy toàn bộ value của object db
      - .forEach((model) => { ... }) - lặp qua từng giá trị(model) trong db.
      - if (model?.associate) - kiểm tra xem model có khai báo associate không.
      - Dấu ?. là optional chaining - để trảnh lỗi nếu giá trị không có associate.
- model.associate(db) - khi model có hàm associate, nó sễ được gọi và truyền toàn bộ danh sách db vào.
                            - nhờ đó model có thể tạo quan hệ với các model khác
      - // Gọi associate cho tất cả models

31. .find - là phương thức của mảng trong JS
          - duyệt qua các phần tử trong mảng roles và trả về phần tử đầu tiên thỏa điều kiện

32. const adminRoleId = roles.find((r) => r.name === "admin").id;
      - sau khi find() trả về object thì lấy luôn thuộc tính .id

36. faker.helpers.arrayElement(["active", "inactive"])
      - Tạo dữ liệu mẫu ngẫu nhiên từ một tập hợp đã lựa chọn

37. up()
    await queryInterface.bulkInsert("users", users, {});
      - queryInterface.bulkInsert(tableName, records, options)
        + "users" - tên bảng trong database
        + users - mảng các object user đã tạo ở trên (admin, instructor, student)
        + {} - options
      - Là hàm của Sequelize dùng để chèn nhiều bản ghi cùng lúc vào database.

38. down()
    await queryInterface.bulkDelete("users", null, {});
      - queryInterface.bulkDelete(tableName, where, options)
        + tableName - tên bảng cần xóa dữ liệu
        + where = null - xóa tất cả dữ liệu trong bảng
        + options = {} - dùng mặc định

39. Tại sao xóa profiles trước rồi mới users
    - Bảng profile có foreign key userId liên kết với bảng users
    - Nếu xóa users trước - lỗi vì FOREIGN KEY
    - Nên xóa bảng con trước rồi mới xóa bảng cha

40. `SELECT id FROM users WHERE roleId IN (SELECT id FROM roles WHERE name='instructor')`
      - WHERE roleId IN - chỉ lấy users có roleId thuộc danh sách bên trong

41. export const generateAccessToken = (userId) => {
      return jwt.sign({ sub: userId }, jwtConfig.JWT_SECRET, {
        expiresIn: jwtConfig.JWT_EXPIRES_IN,
      });
    }
        - jwt.sign(payload, secret, options)
        - Payload { sub: userId }
          + sub viết tắt của subject, thường dùng để lưu đối tượng chính (user) trong token.
          + ở đây sub = userId để biết được người dùng nào đang đăng nhập
        - jwtConfig.JWT_SECRET
          + Dùng để ký token, đảm bảo token k bị giả mạo.
          + Sever sẽ dùng cùng key này để verify token sau này.
        - expiresIn: jwtConfig.JWT_EXPIRES_IN
          + expiresIn xác định thời gian sống của token
          + sau thời gian này, token hết hạn và không thể dùng nữa.

42. export const generateRefreshToken = async (userId, userService) => {
      - userService - là instance của service quản lý user, dùng để cập nhật refresh token vào database43. exp - expiration time - là mốc thời gian token hết hạn, tính bằng giây kể từ thời điểm Unix epoch (01/01/1970)

44. jw.decode - chỉ giải mã token, k kt chữ ký -> nhanh hơn
    jw.verify() - vừa giải mã vừa xác thực token

45. return new Date(decoded.exp * 1000);
      - decode.exp là số giây kể từ 1970-01-01 00:00:00 UTC(giờ quốc tế)
      - trong JS, Date cần miliseconds nên * 1000
      - Kết quả đối tượng Date đại diện cho thời điển token hết hạn

46. /**
    * Tạo cả 2 token
    * @param {string} userId
    * @param {boolean} accessTokenOnly - nếu true chỉ trả accessToken
    * @param {object} refreshTokenRepo
    */
      - Là JSDoc comment, phần ghi chú cho hàm generateTokens
      - Mục đích để người đọc hoặc IDE như VS code hiểu rõ hàm này nhận gì, trả về gì và làm gì
      -  * @param {string} userId 
          + @param là 1 tham số
          + {string} là kiểu dữ liệu
          + userId là tên biến
      -  * @param {boolean} accessTokenOnly - nếu true chỉ trả accessToken
          + {boolean} kiểu dữ liệu là boolean (true or false)
          - dấu - phía sau là phần mô tả ý nghĩa

47. httpOnly: true - Chỉ cho phép server đọc cookie, JS frontend k thể truy cập giúp bảo mật tránh XSS
      + Cross-Site Scripting: là kiểu tấn công chèn mã JS độc hại vào website để đánh cấp thông tin hoặc chiếm quyền điều khiển người dùng
48. sameSite: "strict" - Chỉ gửi cookie nếu request đến từ cùng domain chống CSRF
      + Cross-Site Request Forgery: là kiểu tấn công giả mạo yêu cầu (request) từ trình duyệt người dùng đến server hợp lệ, khi người dùng đang đăng nhập.
49. secure: false - Chỉ cho phép gửi cookie qua HTTPS nếu true


50. token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm9obiIsImlhdCI6MTY5NjYxMjAwMH0.Lr6hEpYxxlA4E4I4vXspD3kQbA1SkB5CvCk05sWkE4k
      + Gồm 3 phần: 
        - header.payload.signature
          + header cho server biết cách ký token
          + payload chứa thông tin user ví dụ userId
          + singture Dùng secret key để đảm bảo token không bị sửa

51. const role = (...roles) => {
      - Đây là hàm bọc (higher-order-function), nhận một hoặc nhiều role hợp lệ.

52. console.error(err.stack) - In ra stack trace (chuỗi mô tả vị trí lỗi trong code)

53. path.extname() - là hàm của nodejs dùng để lấy phần đuội file 
      - VD: "avatar.jpg" -> ".jpg"

54. (file.originalname) - là tên file gốc trên máy của người dùng trước khi upload
      - Nếu người dùng upload file tên meo.png
        -> file.originalname = "meo.png"

55. express.Router() - giúp nhóm các route liên quan thành một module, dễ quản lý

56. constructor() {
this._autoBind();
  }
    - Đảm bảo mọi method của controller luôn có context đúng this và async errors được xử lý tự động

# ************************************************************* `FE` ********************************************************************

1. baseURL - mọi request sẽ tự kết nối với API_URL

2. headers: { "Content-Type": "application/json" }
      - Là kiểu dữ liệu gửi đi trong body có định dạnh JSON

3. withCredentials: true - cho phép gửi cookie kèm request

4. Interceptor - là trạm trung gian nằm giữa request và response
    + Nó cho phép bạn chặn để:
      - Sửa nội dung request/response.
      - thêm header như token
      - hiển thị loading
      - xử lý lỗi tập trung,
      - refresh token hết hạn, v.v.

5. axios.interceptors.request.use(onFulfilled, onRejected);
   axios.interceptors.response.use(onFulfilled, onRejected);
      👉 .use() nhận 2 tham số:
        | Tham số       | Ý nghĩa                                         |
        | ------------- | ----------------------------------------------- |
        | `onFulfilled` | Hàm chạy khi request (hoặc response) thành công |
        | `onRejected`  | Hàm chạy khi request (hoặc response) bị lỗi     |


6. Promise - là lời hứa sẽ trả về giá trị thành công hoặc thất bại vào một thời điểm nào đó trong tương lại.
    - Có 3 trạng thái:
      + Pending: Đang chờ, chưa xong
      + Fulfilled: Thành công, trả về giá trị thành công
      + Rejected: Thất bại, trả về lỗi

7. window.location - là đối tượng chứa thông tin URL hiện tại.
   window.location.href - là toàn bộ URL hiện tại
   window.location.origin - domain + protocol
   window.location.pathname - là phần đường dẫn sau domain

8. children: ReactNode - là component có thể nhận bất kỳ nội dung React nào để render trong main như JSX, component khác...

9. Hook là gì? 
    - Là các hàm đặc biệt cho phép function component sử dụng state, lifecycle methods
    - Một số hook phổ biến:
        | Hook          | Chức năng                                                             |
        | ------------- | --------------------------------------------------------------------- |
        | `useState`    | Tạo state (giữ dữ liệu trong component và cập nhật lại khi thay đổi). |
        | `useEffect`   | Thực hiện side-effect(tác dụng phụ): fetch API, lắng nghe event, setTimeout…   |
        | `useRef`      | Giữ tham chiếu đến DOM hoặc một giá trị không gây re-render.           |
        | `useContext`  | Lấy dữ liệu từ React context.                                         || `useMemo`     | Tối ưu hiệu năng, ghi nhớ giá trị tính toán.                          |
        | `useCallback` | Tối ưu hàm, ghi nhớ function để không tạo lại mỗi lần render.         |

10. useSearchParams - là hook của react-router-dom dùng để lấy query string từ URL

10. useTranslation - Hook này cung cấp 2 thứ quan trọng:
      + 1. t(key): function dịch text
      + 2. i18n: object quản lý ngôn ngữ 
        - i18n.changeLanguage("vi") → chuyển sang tiếng Việt.
        - i18n.language → lấy ngôn ngữ hiện tại.

11. location = useLocation();
      - Hook khác của React Router v6.
      - Dùng để lấy thông tin URL hiện tại (pathname, query string, v.v)

12. ${encodeURIComponent(q)} - mã hóa giá trị q bên trong để an toàn trong URL

13. useDispatch - Trả vè hàm dishpatch để gửi (dispatch) action lên Redux store.
    useSelector - Cho phép component truy cập dữ liệu trong Redux store.

    👉 Tóm gọn:
      useAppDispatch và useAppSelector là 2 custom hook giúp dùng Redux trong TypeScript vừa an toàn, vừa có type-check đầy đủ - k cần ép kiểu thủ công mỗi lần nữa.

14. - persistReducer - giúp bọc Reducer để dữ liệu của Slice được lưu lại trong localStorage khi reload trang.
    - configureStore - dùng để tạo store chính cho Redux (nơi lưu toàn bộ state của app)
    - persistStore - tạo ra persistor, là đối tượng giúp Redux Persist đồng bộ store với localStogare
    - <PersistGate loading={null}> - chặn render app cho tới khi Redux store được load lại từ storage. 
    - Khi state thay đổi ví dụ như người dùng login
      + Persistor tự động ghi state mới vào localStorage.
      + Khi reload trang, Redux sẽ tải lại state từ locaStorage nhờ Persistor

    - persistStore(store) chạy:
      + Nó ngay lặp tức đọc dữ liệu từ localStorage
      + Nếu có state cũ, nó dispatch action bắt buộc để đưa state đó vào Redux store.

15. export type RootState = ReturnType<typeof store.getState>;
      - Đây là kiểu TypeScript đại diện cho toàn bộ state trong Redux store.
      - giúp có kiểu cho toàn bộ state trong store.
    export type AppDispatch = typeof store.dispatch;
      - Đây là kiểu đại diện cho dispatch của store.
      - giúp có kiểu cho dispatch action.
    useDispatch
      - Là hook của Redux cho phép gửi (dispatch) action tới Redux store.
      - Mặc định useDishpatch k có kiểu
      - Với useAppDishpatch, chúng ta sử dụng withTypes<AppDispatch>() để tạo hook useAppDispatch với kiểu AppDispatch. Nhờ vậy, khi sử dụng dispatch, sẽ luôn có kiểu an toàn và có thể truy xuất các action được type-safe
    useSelector:
      - Là hook của Redux để lấy state từ store
      - Mặc định useSelector k có kiểu
      - Với useAppSelector, ta đã tạo một hook useSelector với kiểu RooState, tức là khi truy xuất dữ liệu từ Redux store, sẽ được đảm bảo có kiểu an toàn

    Tổng kết:
      useAppDispatch và useAppSelector giúp sử dụng dispatch và useSelector với kiểu an toàn.
      - đảm bảo mã luôn type an toàn trong suốt quá trình phát triển, giảm thiểu lỗi và dễ dàng bảo trì hơn.





24. Dashboard tổng
    | Component             | Vai trò                                           |
    | --------------------- | ------------------------------------------------- |
    | `StatCard`            | Ô thống kê tổng (courses, users, orders, revenue) |
    | `ChartRevenue`        | Biểu đồ doanh thu                                 |
    | `ChartNewUsers`       | Biểu đồ học viên mới                              |
    | `TopCourses`          | Top khóa học bán chạy                             |
    | `RecentOrders`        | Đơn hàng gần đây                                  |
    | `RecentReviews`       | Đánh giá gần đây                                  |
    | `Notifications`       | Thông báo gần đây                                 |
    | `DashboardPDFPreview` | Hiển thị bản xem trước PDF báo cáo                |


# ***************************************************************************************************************************************
for of cần mảng để lặp for i thì không

- instance - là một đối tượng được tạo ra từ một class hoặc một hàm constructor
- class giống như bản thiết kế
- instance là một bản thực tế được tạo ra từ bản thiết kế đó
- constructor là môt phương thức đặc biệt của class dùng để khởi tạo object khi tạo intance mới bằng new
  + Nói ngắn gọn: constructor là nơi "thiết lập" object ngày khi nó được tạo ra

- _autoBind() sẽ tự động gán lại context(this) cho tất cả các phương thức, tránh bị mất this khi gọi trong route handler.
- context là ngữ cảnh thực thi của một hàm
- this là một từ khóa đặc biệt, đại diện cho object hiện tại mà hàm đang được gọi trên đó
- context của this là giá trị mà this trỏ tới khi hàm chạy.

- prototype - là nơi chứa các method và thuộc tính mà tất cả instance của class/function đó có thể kế thừa.
- Object.getPrototypeOf(obj) - là cách lấy prototy thực tế của một ob
  + Nó trả về ob mà instance tham chiếu ới để tìm các method.

- super() - tự động bind tất cả method của class (cả async và sync) với đúng context this để khỏi phải bind thủ công từng method



# ***************************************************************************************************************************************
BaseController
  1. Tự động bind tất cả các method của class -> tránh mất this khi gọi trong router.
  2. Tự động wrap async method -> nêw async function bị lỗi, lỗi sẽ được chuyển tới next(err) của Express.

  3. proto !== Object.prototype k bind các method JS mặc định như toString()
  4. Dùng vòng while vì mục đích duyệt theo prototype chain của object chứ kp là một mảng hay số lượng cố định
  5. Object.getOwnPropertyNames(proto)
      - trả về tất cả property/method trên prototype hiện tại
      VD: register, login ...
  6. for (const key of Object.getOwnPropertyNames(proto)) {
      - lặp qua từng key để xử lý binding.

  7. if (val.constructor.name === "AsyncFunction") {
      - Kiểm tra method đó có phải async function không

  8. (...args) - là các tham số khi gọi method vd: req, res, next

  9. return val.apply(this, args).catch(err => next?.(err));
      - gọi async function và tự động xử lý lỗi bằng next(err).

  10. else {
        this[key] = val.bind(this);
      }
        - Nếu method không phải async function chỉ cần bind(this) để this bên trong luôn trỏ đúng instance class


# ***************************************************************************************************************************************
1. Luồng Logic search tổng
  | Giai đoạn                           | Mô tả                                                            |
  | ----------------------------------- | ---------------------------------------------------------------- |
  | 1️⃣ React                           | Người dùng gõ từ khóa → gọi API `/admin/search?query=abc`        |
  | 2️⃣ Express Router                  | Điều hướng đến `SearchController.searchAll`                      |
  | 3️⃣ Controller                      | Lấy query từ URL, gọi `SearchService`                            |
  | 4️⃣ Service                         | Gọi `SearchRepository` để truy vấn DB                            |
  | 5️⃣ Repository                      | Tìm kiếm trong `User`, `Course`, `Order` bằng Sequelize          |
  | 6️⃣ Repository                      | Gộp kết quả → gắn thêm `type` → trả về Service                   |
  | 7️⃣ Service → Controller → Frontend | Trả kết quả JSON về client                                       |
  | 8️⃣ React                           | Hiển thị danh sách gợi ý trong dropdown, click chọn thì navigate |

2. Luồng Logic PDF
    | Giai đoạn                           | Mô tả                                                            |
| ----------------------------------- | ---------------------------------------------------------------- |
    | 1️⃣ React (Dashboard)                | Admin bấm "Xuất PDF" → mở modal `DashboardPDFPreview`           |
    | 2️⃣ Modal Preview                    | Modal nhận `summary` và `visibleSections` để hiển thị preview   |
    | 3️⃣ Người dùng chỉnh sửa             | Bật/tắt các section muốn xuất (summary, chart, orders, ... )    |
    | 4️⃣ Capture DOM                      | Frontend lấy element `#pdf-preview-content` và gọi html2canvas  |
    | 5️⃣ Render ảnh                       | html2canvas render DOM thành canvas, trả về dataURL (PNG)       |
    | 6️⃣ Tạo PDF                          | jsPDF tạo file A4, chèn ảnh; nếu nội dung dài thì addPage()     |
    | 7️⃣ Lưu & tải                        | Gọi `pdf.save('dashboard-report.pdf')` để tải về máy            |
    | 8️⃣ Lưu config                       | Lưu `dashboardPDFSections` vào `localStorage` để lần sau dùng   |


  



Luồng be
  1️⃣ Route - Là “điểm vào đầu tiên” khi có request từ client
      - Route giống như cánh cửa dẫn vào hệ thống — người dùng gõ URL nào, nó sẽ biết cần gọi ai (controller nào) để xử lý.

  2️⃣ Controller - Là nơi nhận request từ Route và quyết định luồng xử lý.
      - Controller giống như người phục vụ nhà hàng — nhận yêu cầu từ khách (frontend), chuyển cho bếp (service) làm, rồi mang kết quả trả lại.

  3️⃣ Service - Chứa logic xử lý nghiệp vụ (business logic), ví dụ:
                + Kiểm tra dữ liệu đầu vào,
                + Gộp dữ liệu từ nhiều nguồn,
                + Gọi đến repository để truy vấn DB,
                + Xử lý tính toán, format kết quả trước khi trả về.
      - Service giống như đầu bếp — nhận đơn hàng từ nhân viên phục vụ, nấu món theo công thức, rồi gửi lại cho nhân viên phục vụ (controller).

  4️⃣ Repository - Là lớp chuyên làm việc với Database (ORM như Sequelize, Prisma, Mongoose...).
      - Repository giống như kho thực phẩm — chỉ biết lấy nguyên liệu từ database (các bảng) và đưa cho đầu bếp (service).

  🔄 Tổng luồng hoạt động
      Frontend (React) gọi API:
          ⬇
      👉 Route: /admin/search?query=abc
          ⬇
      👉 Controller: nhận query "abc", gọi Service
          ⬇
      👉 Service: gọi Repository để tìm trong DB
          ⬇
      👉 Repository: chạy Sequelize query → lấy users, courses, orders
          ⬇
      👉 Service: gộp & định dạng dữ liệu
          ⬇
      👉 Controller: trả kết quả về client (res.json)
          ⬇
      👉 Frontend: hiển thị danh sách gợi ý
⚖️ Tại sao chia ra 4 tầng như vậy?
    | Layer          | Vai trò chính                    | Lý do tách riêng                                             |
    | -------------- | -------------------------------- | ------------------------------------------------------------ |
    | **Route**      | Định nghĩa endpoint, HTTP method | Dễ mở rộng và đọc hiểu API rõ ràng                           |
    | **Controller** | Xử lý request/response           | Giúp code rõ ràng, dễ test                                   |
    | **Service**    | Xử lý logic nghiệp vụ            | Có thể tái sử dụng cho nhiều controller                      |
    | **Repository** | Làm việc với database            | Dễ thay đổi DB (Sequelize → Prisma) mà không ảnh hưởng logic |