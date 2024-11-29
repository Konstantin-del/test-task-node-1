CREATE TABLE IF NOT EXISTS products ( 
	product_article integer PRIMARY KEY,  
	product_name character(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_count (
	article_product integer, 
	shop_id integer, 
	product_count integer NOT NULL, 
	product_in_order integer NOT NULL,
	PRIMARY KEY(article_product ,shop_id)
);

CREATE TABLE IF NOT EXISTS product_history_action (
	id serial PRIMARY KEY,
	article integer NOT NULL,
	shop_id integer NOT NULL,
	date_change timestamp NOT NULL,
	count integer NOT NULL,
	action_product character(20) NOT NULL
);

ALTER TABLE product_count 
ADD CONSTRAINT product_count_fk1
FOREIGN KEY (article_product, shop_id) 
REFERENCES products (product_article);

ALTER TABLE product_history_action
ADD CONSTRAINT product_history_action_fk1
FOREIGN KEY (article) 
REFERENCES products (product_article);
