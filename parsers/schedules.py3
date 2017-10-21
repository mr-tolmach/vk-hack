import sys, xml
import xml.etree.ElementTree as ET

#INSERT INTO schedules (city, eventId, placeId, beginDate, endDate, eventDate) VALUES SELECT ('spb', eventId, 'Cinema3049', NOW(), NOW(), '2017-10-28T19:00:00') FROM creations WHERE creationId = ;, 
content = ""
f = ET.parse(sys.argv[1]);
for c in f.findall('schedule'):
  '''
  <schedule>
    <creation-id>Movie166166</creation-id>
    <place-id>Cinema3049</place-id>
    <begin>2017-10-28T19:00:00</begin>
    <end>2017-10-28T19:00:00</end>
    <dates>
      <date>2017-10-28T19:00:00</date>
    </dates>
  </schedule>
  '''
  creationid = c.findall('creation-id')[0].text if c.findall('creation-id')[0].text is not None else ''
  place = c.findall('place-id')[0].text if c.findall('place-id')[0].text is not None else ''
  for dt in c.findall('dates')[0].findall('date'):
    content += "INSERT INTO schedules (city, eventId, placeId, beginDate, endDate, eventDate) VALUES ('spb', (SELECT eventId FROM creations WHERE creationId = '{}'), '{}', NOW(), NOW(), '{}');\n".format(creationid.replace('\n', '').replace("'", "\\'"), place.replace('\n', '').replace("'", "\\'"), dt.text)
content = content[0:len(content) - 3] + ';'
print(content)
