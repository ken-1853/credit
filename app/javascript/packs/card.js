const pay = () => {
  Payjp.setPublicKey(process.env.PAYJP_PUBLIC_KEY);// PAY.JPテスト公開鍵（トークン作成に必要な鍵）
  const form = document.getElementById("charge-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formResult = document.getElementById("charge-form");
    const formData = new FormData(formResult); //カード情報の入力フォームを取得

    const card = {  //各name属性を指定することでそれぞれ入力された情報を変数cardに代入
      //キーはpayjpで指定されたものじゃないといけない
      number: formData.get("order[number]"),
      cvc: formData.get("order[cvc]"),
      exp_month: formData.get("order[exp_month]"),
      exp_year: `20${formData.get("order[exp_year]")}`,
    };

    // ↓カード情報をPAYJPに送信、トークンを受け取る

    // ↓ ステータスが200の時だけトークンの値を取得するようになっている
    //   createTokenメソッドでカード情報（第一引数）を送り、responseとしてトークンを受け取る
    Payjp.createToken(card, (status, response) => {
      if (status == 200) {
        const token = response.id;
        const renderDom = document.getElementById("charge-form");
        // ↓ HTMLにトークンの情報を埋め込み、非表示にする
        const tokenObj = `<input value=${token} name='token' type="hidden"> `;
        renderDom.insertAdjacentHTML("beforeend", tokenObj);
      }
      // ↑カード情報をPAYJPに送信、トークンを受け取る
      document.getElementById("order_number").removeAttribute("name");
      document.getElementById("order_cvc").removeAttribute("name");
      document.getElementById("order_exp_month").removeAttribute("name");
      document.getElementById("order_exp_year").removeAttribute("name");

      // トークン情報をサーバーサイド（コントローラー）に送信
      document.getElementById("charge-form").submit();
    });

  });
};

window.addEventListener("load", pay);