mongo
use quitEntry

db.entries.insert(
	[
{
	title: 'Life with open mind: パナソニックを退社しました',
	url: 'http://blog.yuryu.jp/2012/05/blog-post.html',
	from: 'パナソニック株式会社',
	to: '',
	date: ISODate("2012-05-31T15:00:00Z"),
	category: ["MAKER"]
}
,
{
	title: 'Geekなぺーじ : 退職報告及び自己紹介',
	url: 'http://www.geekpage.jp/blog/?id=2007/12/27',
	from: 'ソニー株式会社',
	to: '',
	date: ISODate("2007-12-27T15:00:00Z"),
	category: ["MAKER"]
}
,
{
	title: 'Happy Hacking Days: 三菱を去る日',
	url: 'http://taisyoku.tsunamayo.net/entries?page=22',
	from: '三菱電機株式会社',
	to: '',
	date: ISODate("2012-01-31T15:00:00Z"),
	category: ["MAKER"]
}

]);

