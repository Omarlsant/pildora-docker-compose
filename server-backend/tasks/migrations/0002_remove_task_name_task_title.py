# Generated by Django 5.1.7 on 2025-03-07 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='name',
        ),
        migrations.AddField(
            model_name='task',
            name='title',
            field=models.CharField(default='Título por Defecto', max_length=255),
        ),
    ]
