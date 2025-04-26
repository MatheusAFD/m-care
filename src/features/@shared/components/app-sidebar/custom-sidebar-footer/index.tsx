import { ChevronUp, LogOut, UserRoundPen, Wallet } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarFooter,
  SidebarMenuButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../ui'

import { getMe } from '@m-care/features/users/services'
import { getNameInitials } from '@m-care/features/@shared/utils'
import { RolesEnum } from '@m-care/features/@shared/enums'
import { Restricted } from '../../restricted'
import { signOut } from '@m-care/features/auth/sign-out/actions'

export const CustomSidebarFooter = async () => {
  const [error, data] = await getMe()

  if (error) {
    return <span>Erro ao carregar.</span>
  }

  const nameInitials = getNameInitials(data?.name ?? '')

  const formattedRole = {
    [RolesEnum.USER]: 'Colaborador',
    [RolesEnum.ADMIN]: 'Administrador',
    [RolesEnum.SUPER_ADMIN]: 'Super Administrador'
  }

  return (
    <SidebarFooter className="mb-8 animate-fadeRender">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarFallback>{nameInitials}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm truncate max-w-[15ch] font-medium">
                      {data?.name}
                    </p>
                  </TooltipTrigger>

                  <TooltipContent>{data?.name}</TooltipContent>
                </Tooltip>

                <p className="flex items-center text-xs">
                  {formattedRole[data?.roles.type ?? RolesEnum.USER]}

                  <ChevronUp className="ml-auto size-5" />
                </p>
              </div>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          <DropdownMenuItem className="cursor-pointer">
            <UserRoundPen />
            <span>Meu perfil</span>
          </DropdownMenuItem>
          <Restricted
            userRole={data?.roles.type}
            requiredRoles={[RolesEnum.ADMIN]}
          >
            <DropdownMenuItem className="cursor-pointer">
              <Wallet />
              <span>Financeiro</span>
            </DropdownMenuItem>
          </Restricted>
          <form action={signOut}>
            <button className="w-full" type="submit">
              <DropdownMenuItem className="cursor-pointer">
                <>
                  <LogOut />
                  <span>Sair</span>
                </>
              </DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  )
}
