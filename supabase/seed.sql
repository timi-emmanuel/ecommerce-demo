insert into public.products (
  name,
  slug,
  category,
  description,
  price,
  rating,
  review_count,
  stock,
  image_url
)
values
  (
    'AeroTune Wireless Headphones',
    'aerotune-wireless-headphones',
    'Audio',
    'Noise isolation, 38-hour battery life, and fast USB-C charging.',
    194985.00,
    4.8,
    214,
    18,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'Pulse Smart Watch S2',
    'pulse-smart-watch-s2',
    'Wearables',
    'Fitness and sleep tracking with a bright AMOLED display and 7-day battery.',
    268500.00,
    4.6,
    163,
    11,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'ErgoRise Office Chair',
    'ergorise-office-chair',
    'Home Office',
    'Adjustable lumbar support and breathable mesh for all-day comfort.',
    374250.00,
    4.7,
    96,
    6,
    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'StrideFlex Sneakers',
    'strideflex-sneakers',
    'Fashion',
    'Everyday comfort sneakers with responsive cushioning.',
    142485.00,
    4.4,
    138,
    24,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'MagSafe Phone Dock Pro',
    'magsafe-phone-dock-pro',
    'Accessories',
    'A weighted aluminum dock designed for one-handed docking.',
    72000.00,
    4.5,
    89,
    0,
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'Compact Bluetooth Speaker',
    'compact-bluetooth-speaker',
    'Audio',
    'Portable speaker with punchy bass and IPX6 water resistance.',
    104985.00,
    4.3,
    121,
    34,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
  )
on conflict (slug) do update
set
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  rating = excluded.rating,
  review_count = excluded.review_count,
  stock = excluded.stock,
  image_url = excluded.image_url,
  is_active = true;
