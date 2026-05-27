-- CreateTable
CREATE TABLE "work_type" (
    "id" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "unit" VARCHAR(50) NOT NULL,

    CONSTRAINT "work_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_log" (
    "id" UUID NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,
    "work_type_id" UUID NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "executor" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "work_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_type_name_key" ON "work_type"("name");

-- AddForeignKey
ALTER TABLE "work_log" ADD CONSTRAINT "work_log_work_type_id_fkey" FOREIGN KEY ("work_type_id") REFERENCES "work_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
