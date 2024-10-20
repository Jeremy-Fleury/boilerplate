-- CreateTable
CREATE TABLE "TodoList" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Todo" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "todoListUuid" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListUuid_fkey" FOREIGN KEY ("todoListUuid") REFERENCES "TodoList"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
