select first_name, last_name, is_minor from participants;

select
  a.id,
  CONCAT(a.first_name, " ", a.last_name) AS name,
  a.is_minor,
  CONCAT(b.first_name, " ", b.last_name) AS parent
from participants AS a LEFT JOIN participants AS b
on a.parent_id = b.id;