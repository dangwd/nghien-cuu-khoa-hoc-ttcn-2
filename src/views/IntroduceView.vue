<template>
  <div>
    <div>
      <h1 class="text-xl font-bold text-left">Giới thiệu</h1>
    </div>
    <div data-aos="fade-right" class="py-5">
      <h1 class="text-base font-medium text-left uppercase">Thông tin chung</h1>
      <div class="leading-10">
        <ul style="list-style-type:disc">
          <li class="text-left">
            Địa chỉ Văn phòng Khoa: P316, Tầng 3 Nhà Hành chính, Học viện Nông nghiệp Việt Nam, Thị trấn Trâu Quỳ,
            huyện
            Gia Lâm, TP. Hà Nội
          </li>
          <li class="text-left">Điện thoại: (024) 62617701</li>
          <li class="text-left">Email: cntt@vnua.edu.vn Website: https://fita.vnua.edu.vn</li>
          <li class="text-left">Ngày thành lập: 10-10-2005</li>
        </ul>
      </div>
      <div class="leading-10">
        <h1 class="text-left">Bộ môn: Hiện nay Khoa có 05 Bộ môn và 01 Tổ văn phòng</h1>
        <ul style="list-style-type:disc">
          <li class="text-left">
            Bộ môn Công nghệ phần mềm;
          </li>
          <li class="text-left">
            Bộ môn Khoa học máy tính;
          </li>
          <li class="text-left">
            Bộ môn Toán;
          </li>
          <li class="text-left">
            Bộ môn Vật lý;
          </li>
          <li class="text-left">
            Bộ môn Mạng và Hệ thống thông tin;
          </li>
          <li class="text-left">
            Tổ văn phòng.
          </li>
        </ul>
      </div>
      <div data-aos="fade-left">
        <img class="rounded-md m-auto"
          src="https://fita.vnua.edu.vn/wp-content/uploads/2023/06/74572383_2511728615779603_4008666081718697984_o-768x389.jpg"
          alt="">
      </div>
      <div data-aos="fade-right" v-for="(intro, index) in introList" :key="index" class="text-left leading-10 py-5">
        <h1 class="text-base font-medium text-left uppercase">{{ intro.title }}</h1>
        <p class="text-left">{{ intro.params }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const introList = [
  {
    title: 'Cơ sở vật chất',
    params: "Hệ thống giảng đường trung tâm của trường Học viện Nông nghiệp Việt Nam đều được trang bị máy chiếu projector. Hệ thống phòng thực hành máy tính của khoa CNTT gồm có 05 phòng được trang bị thiết bị máy tính hiện đại, màn hình cỡ lớn hoặc projector, kết nối mạng Internet thông qua hệ thống mạng nội bộ của trường để đáp ứng nhu cầu học tập của sinh viên trong toàn trường."
  },
  {
    title: 'Tầm nhìn',
    params: 'Trở thành một cơ sở đào tạo có uy tín cao trong nước và khu vực về đào tạo nguồn nhân lực có chất lượng cao, NCKH, ứng dụng tri thức và phát triển công nghệ trong lĩnh vực khoa học máy tính, CNTT, trí tuệ nhân tạo, truyền thông và dữ liệu lớn phục vụ công cuộc phát triển nông nghiệp, nông dân, nông thôn góp phần vào sự nghiệp Công nghiệp hóa – Hiện đại hóa đất nước.'
  },
  {
    title: 'Sứ mạng',
    params: 'Đào tạo và cung cấp nguồn nhân lực chất lượng cao, NCKH, phát triển công nghệ, chuyển giao tri thức, sản phẩm mới về khoa học máy tính, CNTT, trí tuệ nhân tạo, truyền thông và dữ liệu lớn. Đồng thời, cung cấp nguồn nhân lực chất lượng cao để có thể ứng dụng CNTT, trí tuệ nhân tạo, truyền thông và dữ liệu lớn trong nông nghiệp & phát triển nông thôn, đóng góp đắc lực và hiệu quả vào sự nghiệp phát triển nông nghiệp, nông dân, nông thôn và hội nhập quốc tế ngày càng sâu rộng của đất nước'
  },
  {
    title: 'Triết lý giáo dục',
    params: '“Chuyên nghiệp – Sáng tạo – Hội nhập – Trách nhiệm” hướng đến mục tiêu đào tạo nguồn nhân lực có năng lực chuyên môn tốt và chuyên nghiệp, năng động và sáng tạo trong công việc, đáp ứng yêu cầu thực tiễn và hội nhập quốc tế, có trách nhiệm với bản thân, gia đình và xã hội. Mục tiêu giáo dục của đại học định hướng nghiên cứu không chỉ là tiếp cận tri thức và công nghệ tiên tiến mà còn nâng cao năng lực sáng tạo tri thức và công nghệ mới, định hướng áp dụng công nghệ vị nhân sinh và phát triển bền vững, góp phần hình thành thế hệ công dân mới có năng lực và trách nhiệm phụng sự xã hội.'
  },
  {
    title: 'Mục tiêu chiến lược',
    params: 'Mục tiêu chiến lược đến năm 2030 và tầm nhìn đến năm 2050: Chương trình đào tạo linh hoạt giữa đào tạo theo định hướng nghiên cứu và định hướng nghề nghiệp phục vụ nhu cầu xã hội, tạo danh tiếng của cơ sở đào tạo có uy tín cao về công nghệ thông tin ứng dụng trong nông nghiệp và phát triển nông thôn của Việt Nam. Đội ngũ cán bộ tâm huyết, giỏi chuyên môn, nghiệp vụ, năng lực nghiên cứu, cơ sở vật chất hiện đại, phấn đấu trở thành trung tâm nghiên cứu chuyển giao tiến bộ khoa học kỹ thuật, dịch vụ công nghệ thông tin trong nông nghiệp và phát triển nông thôn vào năm 2030. Môi trường làm việc, học tập lý tưởng cho cán bộ, giảng viên và sinh viên. Hợp tác trong nước và quốc tế, đẩy mạnh truyền thông, quảng bá, khẳng định thương hiệu. Ưu tiên nghiên cứu phát triển các hệ thống thông minh và các ứng dụng công nghệ thông tin công nghệ cao trong nông nghiệp và phát triển nông thôn.'
  },
  {
    title: 'Giá trị cốt lõi',
    params: 'Khoa Công nghệ thông tin không ngừng phấn đấu để kiến tạo nên “sự khác biệt, đặc trưng”: Đoàn kết: “Đoàn kết chặt chẽ, cố gắng không ngừng để tiến bộ mãi”. Trách nhiệm: Trách nhiệm, tận tâm và cống hiến hết mình là giá trị cao quý của các thế hệ cán bộ Khoa Công nghệ thông tin, Học viện Nông nghiệp Việt Nam. Hội nhập: Hội nhập quốc tế để tiếp cận chuẩn mực giáo dục đại học khu vực và thế giới, hợp tác Học viện – Khoa – Doanh nghiệp để đáp ứng yêu cầu thực tiễn. Sáng tạo: Đổi mới sáng tạo dựa trên tiếp thu những tinh hoa tri thức của nhân loại, kế thừa những thành quả đã đạt được và phát huy những giá trị truyền thống tốt đẹp nhằm đạt được chất lượng cao trong đào tạo và nghiên cứu khoa học. Chất lượng: Chất lượng cao là mục tiêu, là động lực phấn đấu, là yếu tố cốt lõi làm nên thương hiệu Khoa Công nghệ thông tin. Học viện Nông nghiệp Việt Nam.'
  }
]
</script>
<style></style>