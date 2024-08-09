"""User drawing v1 0.0.4

Revision ID: 916930ea0c43
Revises: 2d64290e61a1
Create Date: 2024-03-09 18:11:24.385266

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '916930ea0c43'
down_revision = '2d64290e61a1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user__drawing',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('notes', sa.String(length=500), nullable=True),
    sa.Column('photo', sa.LargeBinary(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user__drawing')
    # ### end Alembic commands ###
