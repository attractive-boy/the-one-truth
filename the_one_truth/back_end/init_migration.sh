rm migrations/0*.py
cd ..
python manage.py makemigbash init_migration.shrations
python manage.py migrate
python manage.py migrate back_end
