# node-project-yelp-camp

### 프로젝트 소개
RESTful 웹 API 디자인을 토대로 제작한 리뷰형 웹게시판입니다. Node에서 사용되는 다양한 패키지를 활용하는 것을 중점으로 삼았고, 기본적인 기능 및 HTML METHOD의 역할에 적합하도록 고유 리소스를 식별하였습니다.

### 기능
* User
    + CRUD
    + 인증(Authentication)
* Campground
    + CRUD
    + Review
        + CRUD

### 사용 패키지 (dependencies)

<table>
<tr>
<th>express</th>
<td>기반 프레임워크</td>
</tr>
<tr>
<th>ejs, ejs-mate</th>
<td>View Page</td>
</tr>
<tr>
<th>mongoose</th>
<td>DataBase</td>
</tr>
<tr>
<th>method-override</th>
<td>GET, POST 외의 method 처리</td>
</tr>
<tr>
<th>express-session, connect-flash, connect-mongo</th>
<td>session data 사용 및 mongoDB 메모리 활용</td>
</tr>
<tr>
<th>passport, passport-local, passport-local-mongoose</th>
<td>유저 인증</td>
</tr>
<tr>
<th>multer, cloudinary, multer-storage-cloudinary</th>
<td>multipart/form-data 파싱 및 cloudinary 클라우드에 이미지 저장</td>
</tr>
<tr>
<th>@mapbox/mapbox-sdk</th>
<td>지도 및 클러스터 맵 생성</td>
</tr>
<tr>
<th>dotenv</th>
<td>.env 파일 사용</td>
</tr>
<tr>
<th>joi</th>
<td>유효성 검사</td>
</tr>
<tr>
<th>helmet</th>
<td>기본 보안 적용</td>
</tr>
<tr>
<th>express-mongo-sanitize</th>
<td>인젝션 방어를 위한 쿼리스트링 필터링</td>
</tr>
<tr>
<th>sanitize-html</th>
<td>HTML 이스케이프 적용하여 보안 강화</td>
</tr>
</table>

