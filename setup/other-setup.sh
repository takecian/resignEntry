mongo
use quitEntry

db.entries.insert(
	[
{
	title: 'わずか3ヶ月で退職しました',
	url: 'http://tikuwa09.blog45.fc2.com/blog-entry-359.html',
	from: '',
	to: '',
	date: ISODate("2013-07-12T15:00:00Z"),
	category: ["OTHER"]
}
,
{
	title: 'みずほ証券(株)を退職します - hotoku とは',
	url: 'http://d.hatena.ne.jp/hotoku/20130801/1375361600',
	from: 'みずほ証券',
	to: '',
	date: ISODate("2013-08-01T15:00:00Z"),
	category: ["OTHER"]
}
,
{
	title: 'さよなら、図書館。アタシは幸せだったかもしれません。 - ES ist GUT!!',
	url: 'http://d.hatena.ne.jp/rieronlibrary/20100720/1279621225',
	from: '大学図書館',
	to: '',
	date: ISODate("2010-07-20T15:00:00Z"),
	category: ["OTHER"]
}


]);

