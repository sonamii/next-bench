import {
  Text,
  Button,
  Column,

  Line,
 
  Flex,

  Row,
  Icon,
  Kbd,
  IconButton,

  Input,
} from "@once-ui-system/core";
import Image from "next/image";
export function SearchCard({
  institutionName,
  institutionSlug,
  institutionLogo,
  institutionLocation,
  institutionRating,
  institutionDescription,
  institutionPopularity,
}: {
  institutionName: string;
  institutionSlug: string;
  institutionLogo: string;
  institutionLocation: string;
  institutionRating: number;
  institutionDescription: string;
  institutionPopularity: string[];
}) {
  return (
    <Column
      padding="8"
      horizontal="center"
      vertical="start"
      border="neutral-alpha-medium"
      radius="l"
      shadow="xs"
      fitHeight
     fillWidth
      maxWidth={28}
      gap="xs"
    >
      <Column
        background="neutral-alpha-weak"
        border="neutral-alpha-weak"
        radius="l"
        fillWidth
        padding="12"
        vertical="between"
        minHeight={11}
        maxHeight={11}
      >
        <Row horizontal="between" marginBottom="m">
          <Flex center gap="4">
            <Icon
              name={"earth"}
              size="s"
              style={{ color: "#787878" }}
            ></Icon>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Tuition
            </Text>
          </Flex>
          <Row gap="8">
            {institutionPopularity.map((popularity) => (
              <Kbd data-scaling="110">{popularity}</Kbd>
            ))}
          </Row>
        </Row>
         {/* <Image
          alt="logo"
          width={30}
          height={30}
          src={institutionLogo}
          style={{borderRadius:"1000px"}}
        />  */}
        <Flex horizontal="between" vertical="end">
          <Text variant="display-strong-xs" onBackground="neutral-strong">
             <b> {institutionName.length > 11 ? institutionName.slice(0, 11) + "..." : institutionName}</b>
            {" "}
            <Text onBackground="neutral-medium" variant="body-default-s">
              /{institutionLocation.length > 20 ? institutionLocation.slice(0, 20) + "..." : institutionLocation}
            </Text>
          </Text>
          <IconButton icon="arrowRight" size="l" href={"/edu/"+institutionSlug}></IconButton>
        </Flex>
      </Column>
      <Row vertical="center" horizontal="between" fillWidth  paddingLeft="2">
        <Text variant="body-default-m" onBackground="neutral-medium">
          {institutionDescription.length >30 ? institutionDescription.slice(0, 30) + "..." : institutionDescription}
        </Text>
        <Row>
          <Row>
            {Array.from({ length: Math.floor(institutionRating) }, (_, i) => (
              <Icon key={i} name="star" size="s" onSolid="neutral-medium"></Icon>
            ))}
            {Array.from({ length: 5 - Math.floor(institutionRating) }, (_, i) => (
              <Icon key={i} name="starOutline" size="s"  onSolid="neutral-medium"></Icon>
            ))}
          </Row>
         
          
        </Row>
      </Row>
    </Column>
  );
}
