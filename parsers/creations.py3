import sys, xml
import xml.etree.ElementTree as ET

content = "INSERT INTO creations (creationId, eventName, originalName, description, editorialComment, widgetDescription, synopsis, rating, mainPhoto) VALUES "
f = ET.parse(sys.argv[1]);
for c in f.findall('creation'):
	'''
    <creation-id>Movie165618</creation-id>
    <name lang="ru">Простая история</name>
    <original-name lang="ru">The Straight Story</original-name>
    <url>https://www.afisha.ru/movie/165618/</url>
    <description lang="ru">Элвин Стрейт узнает о том, что его старший брат, с которым он не разговаривал больше 10 лет, тяжело болен. Бросив все, семидесятитрехлетний фермер садится на свой мини-трактор, чтобы преодолеть 350 километров, отделяющих его от брата.</description>
    <editorial-comment lang="ru">Элвин Стрейт узнает о том, что его старший брат, с которым он не разговаривал больше 10 лет, тяжело болен. Бросив все, семидесятитрехлетний фермер садится на свой мини-трактор, чтобы преодолеть 350 километров, отделяющих его от брата.</editorial-comment>
    <widget-description lang="ru"></widget-description>
    <synopsis lang="ru"></synopsis>
    <rating>3.3</rating>
    <main-photo></main-photo>
  </creation>
	'''
	creationid = c.findall('creation-id')[0].text if c.findall('creation-id')[0].text is not None else ''
	name = c.findall('name')[0].text if c.findall('name')[0].text is not None else ''
	url = c.findall('url')[0].text if c.findall('url')[0].text is not None else ''
	description = c.findall('widget-description')[0].text if c.findall('widget-description')[0].text is not None else ''
	rating = c.findall('rating')[0].text if c.findall('rating')[0].text is not None else ''
	photo = c.findall('main-photo')[0].text if c.findall('main-photo')[0].text is not None else ''
	content += "('{}', '{}', '', '{}', '', '{}', '', '{}', '{}'), \n".format(creationid.replace('\n', '').replace("'", "\\'"), name.replace('\n', '').replace("'", "\\'"), description.replace('\n', '').replace("'", "\\'"), url.replace('\n', '').replace("'", "\\'"), rating.replace('\n', '').replace("'", "\\'"), photo.replace('\n', '').replace("'", "\\'"))
content = content[0:len(content) - 3] + ';'
print(content)
