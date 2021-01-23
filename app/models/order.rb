class Order < ApplicationRecord
  # orderモデルにtokenが存在しないため、追加してあげる必要がある
  # モデルに対応するテーブルのカラム名以外の属性を扱いたい場合はattr_accessorを用いて追加する
  attr_accessor :token

  # ↓ バリデーションをかけてあげると、エラー画面に遷移せずに空欄を弾くことができる
  validates :token, presence: true
  validates :price, presence: true
end
