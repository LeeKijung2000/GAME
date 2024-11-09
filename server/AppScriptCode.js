function doGet(e) {
  const id = e.parameter.id.trim();  // 공백 제거
  const name = e.parameter.name.trim();  // 공백 제거

  // 로그로 입력받은 id와 name을 출력
  Logger.log("Received ID: " + id);
  Logger.log("Received Name: " + name);
  
  // 사용자 데이터 배열 (아이디, 이름)
  const users = [
    ["20180746", "최성현"],
    ["20181494", "이아현"],
    ["20190629", "조경민"],
    ["20200138", "이상우"],
    ["20200660", "권희정"],
    ["20201155", "이호성"],
    ["20201538", "권지명"],
    ["20201539", "김경수"],
    ["20201540", "김영익"],
    ["20201541", "김영훈"],
    ["20201542", "김주영"],
    ["20201543", "남정청"],
    ["20201550", "윤진서"],
    ["20201553", "정민철"],
    ["20201558", "황상민"],
    ["20210381", "이다빈"],
    ["20211395", "안정현"],
    ["20211409", "민병선"],
    ["20211411", "손형준"],
    ["20211419", "이예성"],
    ["20221383", "박유미"],
    ["20221384", "서예원"],
    ["20221385", "여은채"],
    ["20221388", "이채원"],
    ["20221389", "최상은"],
    ["20221390", "최서영"],
    ["20221392", "최지윤"],
    ["20221398", "김륜구"],
    ["20221402", "김현목"],
    ["20221403", "박진"],
    ["20221407", "문군"],
    ["20221414", "정상준"],
    ["20221418", "조훈희"],
    ["20221574", "한석범"],
    ["20221923", "이중현"],
    ["20231868", "김지혜"],
    ["20241862", "이기정"]
  ];

  let success = false;

  // 아이디와 이름 확인
  for (let i = 0; i < users.length; i++) {
    if (users[i][0] === id && users[i][1] === name) {  // 아이디와 이름을 배열에서 비교
      success = true;
      break;
    }
  }

  // 로그기록 시트에 로그인 기록 추가
  const ss = SpreadsheetApp.openById('1huLeiNNhs5jmjZDiYIDe2KCtEEjHd6uQoTFHxPThmd0');
  const logSheet = ss.getSheetByName('로그기록');
  const timestamp = new Date();
  const logEntry = [id, name, success ? '성공' : '실패', timestamp];
  logSheet.appendRow(logEntry);

  // 결과를 JSON 형태로 반환
  return ContentService.createTextOutput(JSON.stringify({ success: success }))
    .setMimeType(ContentService.MimeType.JSON);
}