mongo
use quitEntry

db.entries.insert(
	[
{
	title: '寿退社か!?：「普通の女の子に戻りたい」　IT戦士・岡田有花、退社 - ITmedia News',
	url: 'http://www.itmedia.co.jp/news/articles/1102/10/news090.htmls',
	from: 'アイティメディア株式会社',
	to: '',
	date: ISODate("2011-02-10T15:00:00Z"),
	category: ["MEDIA"]
}
,
{
	title: '博報堂を辞めました。 | 美味しいコンセプト',
	url: 'http://shimpe1.com/?p=84',
	from: '株式会社博報堂',
	to: '',
	date: ISODate("2011-09-13T15:00:00Z"),
	category: ["MEDIA"]
}
]);

